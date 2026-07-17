const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// const { GoogleGenerativeAI } = require("@google/generative-ai");
const knowledge = require("./knowledge");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rate limiting — max 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    // ✅ Amount validation
    if (!amount || amount < 1 || amount > 100000) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // ✅ Math.round prevents decimal paise
      currency: "INR",
    });

    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    // ✅ Error handling — server won't crash
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // ✅ Check all fields exist
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (signature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

// RAG Chatbot route
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = `You are a helpful assistant for Tip Jar, a creator tipping platform.
Answer the user's question based ONLY on the information provided below.
If the answer is not in the provided information, say "I don't have that information, please contact shivam@email.com"
Keep answers friendly, short and helpful.

KNOWLEDGE BASE:
${knowledge}

USER QUESTION: ${question}

ANSWER:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(500).json({ error: "AI error", details: data });
    }

    const answer = data.candidates[0].content.parts[0].text;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with the AI" });
  }
});
app.listen(5000, () => console.log("✅ Backend running on port 5000"));
