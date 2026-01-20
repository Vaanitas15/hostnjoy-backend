// server/index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors()); // sesuaikan untuk production

const PORT = process.env.PORT || 3000;

// init midtrans Snap client (sandbox)
const snap = new midtransClient.Snap({
  isProduction: false, // sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
});

// sample merchant WA number (format internasional tanpa +, contoh 62812xxx)
const MERCHANT_WA = process.env.MERCHANT_WA || "6281234567890";

app.post("/api/create-transaction", async (req, res) => {
  try {
    const { name, email, whatsapp, item_name, gross_amount } = req.body;

    if (!name || !email || !whatsapp || !item_name || !gross_amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // buat order id unik (boleh gunakan UUID atau timestamp)
    const order_id = "ORDER-" + Date.now();

    // payload transaction untuk Snap
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: Number(gross_amount),
      },
      customer_details: {
        first_name: name,
        email: email,
        phone: whatsapp,
      },
      item_details: [
        {
          id: "ITEM-1",
          price: Number(gross_amount),
          quantity: 1,
          name: item_name,
        },
      ],
      // optional: set custom expiry atau custom fields
      // expiry: { /* ... */ }
    };

    // panggil Snap API untuk menghasilkan snap token
    const transaction = await snap.createTransaction(parameter);
    // transaction berisi redirect_url & token
    // contoh: { token: '...', redirect_url: '...' }

    // save order minimal di DB jika perlu (di contoh disimpan di memory atau log)
    console.log("New order created:", order_id, parameter);

    return res.json({
      snapToken: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: order_id,
      merchant_wa: MERCHANT_WA,
    });
  } catch (err) {
    console.error("create-transaction error", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
