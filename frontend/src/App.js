import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import ChatBot from "./pages/ChatBot";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  jar: { fontSize: "72px", marginBottom: "8px" },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 8px 0",
  },
  subtitle: { fontSize: "15px", color: "#888", margin: "0 0 32px 0" },
  label: {
    display: "block",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "8px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  inputWrapper: { position: "relative", marginBottom: "16px" },
  rupee: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "#667eea",
    fontWeight: "700",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 36px",
    fontSize: "20px",
    fontWeight: "600",
    border: "2px solid #e8e8e8",
    borderRadius: "12px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
  },
  quickAmounts: { display: "flex", gap: "8px", marginBottom: "28px" },
  chip: {
    flex: 1,
    padding: "10px 0",
    border: "2px solid #e8e8e8",
    borderRadius: "10px",
    background: "white",
    fontSize: "14px",
    fontWeight: "600",
    color: "#667eea",
    cursor: "pointer",
  },
  chipActive: {
    flex: 1,
    padding: "10px 0",
    border: "2px solid #667eea",
    borderRadius: "10px",
    background: "#667eea",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(102,126,234,0.4)",
  },
  buttonDisabled: {
    width: "100%",
    padding: "18px",
    background: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "not-allowed",
  },
  secureNote: { marginTop: "20px", fontSize: "13px", color: "#aaa" },
  footer: {
    marginTop: "32px",
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px",
  },
  footerLinks: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "8px",
  },
  footerLink: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: "13px",
  },
  successPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  successCard: {
    background: "white",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  successIcon: { fontSize: "80px", marginBottom: "16px" },
  successTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 12px 0",
  },
  successMsg: {
    fontSize: "16px",
    color: "#888",
    margin: "0 0 32px 0",
    lineHeight: "1.5",
  },
  resetBtn: {
    padding: "14px 40px",
    background: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

const QUICK_AMOUNTS = [49, 99, 199];

function TipJar() {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });

  const handleTip = async () => {
    if (!amount || amount <= 0) return alert("Please enter a valid amount");
    setLoading(true);
    try {
      await loadRazorpay();
      const { data } = await axios.post(
        "https://tip-jar-backend.onrender.com/create-order",
        { amount },
      );
      const options = {
        key: "rzp_test_T5y07TTGRoIOxB", // 👈 replace with your key
        amount: data.amount,
        currency: "INR",
        name: "Tip Jar 🫙",
        description: "Support your favourite creator",
        order_id: data.orderId,
        theme: { color: "#667eea" },
        handler: async (response) => {
          const result = await axios.post(
            "https://tip-jar-backend.onrender.com/verify-payment",
            response,
          );
          if (result.data.success) {
            setPaidAmount(amount);
            setSuccess(true);
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      alert("Something went wrong. Is your backend running?");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.successPage}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h1 style={styles.successTitle}>Thank you so much!</h1>
          <p style={styles.successMsg}>
            Your tip of <strong>₹{paidAmount}</strong> was received!
            <br />
            You are amazing! 💜
          </p>
          <button
            style={styles.resetBtn}
            onClick={() => {
              setSuccess(false);
              setAmount("");
              setLoading(false);
            }}
          >
            Send Another Tip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.jar}>🫙</div>
        <h1 style={styles.title}>Tip Jar</h1>
        <p style={styles.subtitle}>Support your favourite creator 💜</p>
        <label style={styles.label}>Choose an amount</label>
        <div style={styles.quickAmounts}>
          {QUICK_AMOUNTS.map((q) => (
            <button
              key={q}
              style={Number(amount) === q ? styles.chipActive : styles.chip}
              onClick={() => setAmount(q)}
            >
              ₹{q}
            </button>
          ))}
        </div>
        <label style={styles.label}>Or enter custom amount</label>
        <div style={styles.inputWrapper}>
          <span style={styles.rupee}>₹</span>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleTip}
          disabled={loading}
        >
          {loading ? "⏳ Opening Payment..." : "💸 Send Tip"}
        </button>
        <p style={styles.secureNote}>🔒 Secured by Razorpay · 100% safe</p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="/privacy-policy" style={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="/terms" style={styles.footerLink}>
            Terms & Conditions
          </a>
          <a href="/refund" style={styles.footerLink}>
            Refund Policy
          </a>
        </div>
        <p style={{ margin: 0 }}>
          © 2026 Tip Jar · Contact: shivamtiwaricr7@gmail.com
        </p>
      </div>
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TipJar />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund" element={<Refund />} />
    </Routes>
  );
}
