const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const { GoogleGenerativeAI } = require("@google/generative-ai");
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
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = `
You are a helpful assistant for Tip Jar.
Answer ONLY based on this knowledge base:

${knowledge}

USER QUESTION: ${question}
ANSWER:
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with the AI" });
  }
});
app.listen(5000, () => console.log("✅ Backend running on port 5000"));
