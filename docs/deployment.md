# QRForge Deployment Guide

## 1. Prerequisites
* A [Vercel](https://vercel.com) account (or any Node.js hosting platform).
* A [Supabase](https://supabase.com) project with PostgreSQL.

## 2. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase project dashboard.
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql` and click **Run**.
4. Navigate to **Project Settings** -> **API** and copy:
   * Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   * Project API anon/public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   * Project service_role secret (`SUPABASE_SERVICE_ROLE_KEY`)

## 3. Deploy to Vercel
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the repository into your Vercel Dashboard.
3. Framework Preset: **Next.js**.
4. Configure the following Environment Variables:
   * `NEXT_PUBLIC_APP_URL` = `https://your-domain.vercel.app`
   * `NEXT_PUBLIC_APP_NAME` = `QRForge`
   * `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
   * `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key`
5. Click **Deploy**.

## 4. Production Health Checks
* Verify that static QR codes generate immediately on `/create`.
* Verify that signing up creates a profile entry in the `profiles` table.
* Verify dynamic redirection by scanning or navigating to `/q/{short_code}`.
