# QRForge API Documentation

All API routes require authentication unless marked as public. Authenticated requests use session cookies managed by Supabase Auth or Bearer tokens.

## Base URL
`/api`

## Endpoints

### 1. QR Code Management

#### `GET /api/qr`
List QR codes owned by the authenticated user.
* **Query Parameters:**
  * `limit`: number (default: 12, max: 50)
  * `offset`: number (default: 0)
  * `type`: string (e.g. `url`, `wifi`, `vcard`, etc.)
  * `status`: string (`active`, `disabled`, `expired`, `archived`)
  * `folder_id`: string (UUID)
  * `search`: string (filters by QR name)
  * `sort`: `newest` | `oldest` | `scans` | `name`
* **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 42,
    "limit": 12,
    "offset": 0
  }
}
```

#### `POST /api/qr`
Create a new QR code (static or dynamic).
* **Body:**
```json
{
  "name": "Summer Menu",
  "qr_type": "url",
  "is_dynamic": true,
  "content": { "url": "https://restaurant.com/menu" },
  "destination_url": "https://restaurant.com/menu",
  "customization": {
    "fgColor": "#000000",
    "bgColor": "#ffffff",
    "dotStyle": "rounded"
  }
}
```

#### `GET /api/qr/:id`
Fetch single QR code by ID.

#### `PATCH /api/qr/:id`
Update QR metadata, destination URL (for dynamic QR codes), customization, or status.

#### `DELETE /api/qr/:id`
Archive/Delete QR code.

#### `POST /api/qr/:id/duplicate`
Duplicate an existing QR code. If dynamic, allocates a fresh `short_code`.

#### `GET /api/qr/:id/analytics`
Granular analytics for a specific QR code.
* **Query Parameters:**
  * `period`: `7d` | `30d` | `90d` | `custom`
  * `start`, `end`: ISO date strings (when `period=custom`)

---

### 2. Public Redirect & Analytics

#### `GET /q/:short_code` (Public)
Resolves short code, records device, OS, browser, anonymized geographic region, and issues `302 Found` redirect to destination.
* If paused/disabled: redirects to `/q/:short_code/inactive`.
* If expired: redirects to `/q/:short_code/expired`.
* Rate-limited to prevent scan flooding.

---

### 3. Folder Management

* `GET /api/folders`: List all folders with QR counts.
* `POST /api/folders`: Create folder `{ "name": "...", "color": "#HEX" }`.
* `PATCH /api/folders/:id`: Rename or recolor folder.
* `DELETE /api/folders/:id`: Delete folder.

---

### 4. Bulk Generation

#### `POST /api/bulk`
* Accepts an array of row objects and customization settings, validating every item and creating QR records in batch.
