# HostNJoy Backend - Midtrans Integration

Backend untuk sistem pembayaran HostNJoy menggunakan Midtrans Snap.

## Setup Local

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd backend-hotspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` ke `.env`:
```bash
cp .env.example .env
```

Edit `.env` dan masukkan:
- `MIDTRANS_SERVER_KEY` - dari dashboard Midtrans
- `MIDTRANS_CLIENT_KEY` - dari dashboard Midtrans
- `MERCHANT_WA` - nomor WhatsApp merchant (format: 62xxx)

### 4. Run Server
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### POST `/api/create-transaction`
Membuat transaksi pembayaran Midtrans.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "6281234567890",
  "item_name": "starter",
  "gross_amount": 140000
}
```

**Response:**
```json
{
  "snap_token": "xxx",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/xxx",
  "merchant_wa": "6281585220087"
}
```

## Deployment ke Render

1. Push code ke GitHub
2. Connect repository ke Render
3. Set environment variables di Render dashboard
4. Deploy (auto deploy on push)

## Frontend Integration

Update URL di `cart.html`:
```javascript
const API_BASE_URL = "https://your-render-app-url/api";
```

## Support
Hubungi HostNJoy support untuk bantuan.
