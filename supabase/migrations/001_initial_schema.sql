-- QRForge Database Schema
-- Run this migration against your Supabase PostgreSQL database

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- FOLDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6366F1',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- QR CODES
-- ============================================================
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  
  -- Metadata
  name TEXT NOT NULL,
  qr_type TEXT NOT NULL,
  is_dynamic BOOLEAN DEFAULT false,
  short_code TEXT UNIQUE,
  
  -- Content
  content JSONB NOT NULL,
  encoded_data TEXT NOT NULL,
  
  -- Dynamic QR
  destination_url TEXT,
  
  -- Customization
  customization JSONB DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'expired', 'archived')),
  expires_at TIMESTAMPTZ,
  
  -- Denormalized stats
  total_scans INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  archived_at TIMESTAMPTZ
);

-- ============================================================
-- QR SCANS (Analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
  
  scanned_at TIMESTAMPTZ DEFAULT now(),
  country TEXT,
  region TEXT,
  city TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  scan_fingerprint TEXT
);

-- ============================================================
-- QR TEMPLATES
-- ============================================================
CREATE TABLE IF NOT EXISTS qr_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  qr_type TEXT NOT NULL,
  customization JSONB NOT NULL,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_code ON qr_codes(short_code) WHERE short_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_qr_codes_folder ON qr_codes(folder_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_status ON qr_codes(status);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(qr_type);
CREATE INDEX IF NOT EXISTS idx_qr_codes_created ON qr_codes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qr_scans_qr_code ON qr_scans(qr_code_id);
CREATE INDEX IF NOT EXISTS idx_qr_scans_time ON qr_scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_qr_scans_fingerprint ON qr_scans(scan_fingerprint);
CREATE INDEX IF NOT EXISTS idx_folders_user ON folders(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_user ON qr_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_system ON qr_templates(is_system) WHERE is_system = true;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_templates ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- QR Codes
CREATE POLICY "Users can view own QR codes"
  ON qr_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create QR codes"
  ON qr_codes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own QR codes"
  ON qr_codes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own QR codes"
  ON qr_codes FOR DELETE USING (auth.uid() = user_id);

-- QR Scans (users see scans for their own QR codes)
CREATE POLICY "Users can view scans for own QR codes"
  ON qr_scans FOR SELECT
  USING (qr_code_id IN (SELECT id FROM qr_codes WHERE user_id = auth.uid()));

-- Folders
CREATE POLICY "Users can view own folders"
  ON folders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create folders"
  ON folders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own folders"
  ON folders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own folders"
  ON folders FOR DELETE USING (auth.uid() = user_id);

-- Templates
CREATE POLICY "Users can view system and own templates"
  ON qr_templates FOR SELECT
  USING (is_system = true OR user_id = auth.uid());
CREATE POLICY "Users can create own templates"
  ON qr_templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own templates"
  ON qr_templates FOR UPDATE USING (auth.uid() = user_id AND is_system = false);
CREATE POLICY "Users can delete own templates"
  ON qr_templates FOR DELETE USING (auth.uid() = user_id AND is_system = false);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Increment scan counter (called by service role)
CREATE OR REPLACE FUNCTION increment_scan_count(qr_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE qr_codes SET total_scans = total_scans + 1, updated_at = now()
  WHERE id = qr_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_folders_updated_at
  BEFORE UPDATE ON folders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED SYSTEM TEMPLATES
-- ============================================================
INSERT INTO qr_templates (name, description, qr_type, customization, is_system) VALUES
  ('Restaurant Menu', 'Warm colors perfect for restaurant menus', 'url', '{"fgColor":"#92400E","bgColor":"#FFFBEB","dotStyle":"rounded","cornerSquareStyle":"extra-rounded","errorCorrection":"M"}', true),
  ('WiFi Access', 'Clean blue theme for WiFi sharing', 'wifi', '{"fgColor":"#1E40AF","bgColor":"#EFF6FF","dotStyle":"dots","cornerSquareStyle":"dot","errorCorrection":"M"}', true),
  ('Business Card', 'Professional dark theme for business contacts', 'vcard', '{"fgColor":"#1F2937","bgColor":"#F9FAFB","dotStyle":"classy-rounded","cornerSquareStyle":"extra-rounded","errorCorrection":"H"}', true),
  ('Event', 'Vibrant purple theme for event invitations', 'event', '{"fgColor":"#7C3AED","bgColor":"#F5F3FF","dotStyle":"rounded","cornerSquareStyle":"dot","errorCorrection":"M"}', true),
  ('Social Profile', 'Modern gradient-ready social media QR', 'social', '{"fgColor":"#DB2777","bgColor":"#FDF2F8","dotStyle":"extra-rounded","cornerSquareStyle":"dot","errorCorrection":"M"}', true),
  ('Product Link', 'Green theme for product and shop links', 'url', '{"fgColor":"#065F46","bgColor":"#ECFDF5","dotStyle":"classy","cornerSquareStyle":"extra-rounded","errorCorrection":"M"}', true),
  ('Contact Card', 'Minimal clean contact sharing', 'vcard', '{"fgColor":"#374151","bgColor":"#FFFFFF","dotStyle":"square","cornerSquareStyle":"square","errorCorrection":"H"}', true),
  ('Payment', 'Gold theme for payment and donation links', 'url', '{"fgColor":"#92400E","bgColor":"#FEF3C7","dotStyle":"dots","cornerSquareStyle":"dot","errorCorrection":"H"}', true)
ON CONFLICT DO NOTHING;
