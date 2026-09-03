import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit } from '@/lib/rate-limit';
import { UAParser } from 'ua-parser-js';

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rl = checkRateLimit(`scan_${ip}`, 100, 60 * 1000); // 100 per minute
  if (!rl.allowed) return new NextResponse('Rate limit exceeded', { status: 429 });

  const { code } = await params;
  const supabase = createAdminClient();

  const { data: qrCode, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('short_code', code)
    .single();

  if (error || !qrCode) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  if (qrCode.status === 'disabled') {
    return NextResponse.redirect(new URL(`/q/${code}/inactive`, request.url));
  }

  if (qrCode.status === 'expired' || (qrCode.expires_at && new Date(qrCode.expires_at) < new Date())) {
    return NextResponse.redirect(new URL(`/q/${code}/expired`, request.url));
  }

  const destination = qrCode.destination_url || qrCode.content;
  if (!destination) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Analytics
  const userAgent = request.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  const ua = parser.getResult();
  
  const country = request.headers.get('x-vercel-ip-country');
  const region = request.headers.get('x-vercel-ip-country-region');
  const city = request.headers.get('x-vercel-ip-city');

  const today = new Date().toISOString().split('T')[0];
  const scanFingerprint = await hashString(`${ip}-${userAgent}-${today}`);

  const recordScan = async () => {
    try {
      await supabase.from('qr_scans').insert({
        qr_code_id: qrCode.id,
        country,
        region,
        city,
        device_type: ua.device.type || 'desktop',
        os: ua.os.name,
        browser: ua.browser.name,
        scan_fingerprint: scanFingerprint
      });

      await supabase.rpc('increment_scans', { row_id: qrCode.id });
    } catch (e) {
      console.error('Failed to record scan analytics:', e);
    }
  };

  // Vercel / Next.js waitUntil if we can, otherwise fire and forget
  if (typeof (request as any).waitUntil === 'function') {
    (request as any).waitUntil(recordScan());
  } else {
    recordScan();
  }

  return NextResponse.redirect(destination, 302);
}
