# QRForge Database Architecture & Schema

## Database Engine
* **PostgreSQL** hosted via **Supabase**.
* Row Level Security (RLS) is enabled on all tables.
* Migration script located at `supabase/migrations/001_initial_schema.sql`.

## Schema Entity-Relationship

```
  +------------------+         +-------------------+
  |    profiles      | <-------+     folders       |
  |------------------|         |-------------------|
  | id (PK, auth.uid)|         | id (PK)           |
  | full_name        |         | user_id (FK)      |
  | avatar_url       |         | name              |
  | plan             |         | color             |
  +--------+---------+         +---------+---------+
           |                             |
           |                             |
           v                             v
  +------------------+         +-------------------+
  |     qr_codes     | <-------+      (folder)     |
  |------------------|
  | id (PK)          |
  | user_id (FK)     |
  | folder_id (FK)   |
  | name             |
  | qr_type          |
  | is_dynamic       |
  | short_code (UQ)  |
  | destination_url  |
  | content (JSONB)  |
  | customization    |
  | status           |
  | total_scans      |
  +--------+---------+
           |
           v
  +------------------+
  |     qr_scans     |
  |------------------|
  | id (PK)          |
  | qr_code_id (FK)  |
  | scanned_at       |
  | country          |
  | region           |
  | city             |
  | device_type      |
  | os               |
  | browser          |
  | scan_fingerprint |
  +------------------+
```

## Security & Row-Level Security (RLS)

1. **`profiles` Table:**
   * Users can only read and update their own profile matching `auth.uid() = id`.
2. **`qr_codes` Table:**
   * Full CRUD restricted strictly to `auth.uid() = user_id`.
   * Public redirect queries bypass RLS via the Supabase Service Role Key (Admin Client) server-side inside `/q/[code]`.
3. **`qr_scans` Table:**
   * Scans can be viewed only if `qr_code_id IN (SELECT id FROM qr_codes WHERE user_id = auth.uid())`.
   * Anonymous scans are written securely through the service-role client.
4. **`folders` Table:**
   * Full CRUD restricted to `auth.uid() = user_id`.
5. **`qr_templates` Table:**
   * System templates (`is_system = true`) are readable by all users. Custom templates are restricted to the owner.
