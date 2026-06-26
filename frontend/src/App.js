import { useState } from "react";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
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
  jar: {
    fontSize: "72px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "15px",
    color: "#888",
    margin: "0 0 32px 0",
  },
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
  inputWrapper: {
    position: "relative",
    marginBottom: "16px",
  },
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
    transition: "border-color 0.2s",
  },
  quickAmounts: {
    display: "flex",
    gap: "8px",
    marginBottom: "28px",
  },
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
    transition: "all 0.2s",
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
    letterSpacing: "0.5px",
    boxShadow: "0 8px 24px rgba(102,126,234,0.4)",
    transition: "transform 0.1s, box-shadow 0.1s",
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
    letterSpacing: "0.5px",
  },
  secureNote: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#aaa",
  },
  // Success screen
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
  successIcon: {
    fontSize: "80px",
    marginBottom: "16px",
  },
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

export default function App() {
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

      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount,
      });

      // const options = {
      //   key: "rzp_test_T5y07TTGRoIOxB", // 👈 paste your Key ID here
      //   amount: data.amount,
      //   currency: "INR",
      //   name: "Tip Jar 🫙",
      //   description: "Support your favourite creator",
      //   order_id: data.orderId,
      //   theme: { color: "#667eea" },
      //   handler: async (response) => {
      //     const result = await axios.post(
      //       "http://localhost:5000/verify-payment",
      //       response,
      //     );
      //     if (result.data.success) {
      //       setPaidAmount(amount);
      //       setSuccess(true);
      //     }
      //   },
      //   modal: {
      //     ondismiss: () => setLoading(false),
      //   },
      // };

      const options = {
        key: "rzp_test_T5y07TTGRoIOxB",
        amount: data.amount,
        currency: "INR",
        name: "Tip Jar 🫙",
        description: "Support your favourite creator",
        order_id: data.orderId,
        theme: { color: "#667eea" },

        // 👇 Add this to force UPI visibility in test mode
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI",
                instruments: [{ method: "upi" }],
              },
            },
            sequence: ["block.upi"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },

        handler: async (response) => {
          const result = await axios.post(
            "http://localhost:5000/verify-payment",
            response,
          );
          if (result.data.success) {
            setPaidAmount(amount);
            setSuccess(true);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
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
            Your tip of <strong>₹{paidAmount}</strong> was received
            successfully.
            <br />
            You're amazing! 💜
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
        <p style={styles.subtitle}>
          Support your favourite creator with a small tip 💜
        </p>

        <label style={styles.label}>Choose an amount</label>
        <div style={styles.quickAmounts}>
          {QUICK_AMOUNTS.map((q) => (
            <button
              key={q}
              style={amount == q ? styles.chipActive : styles.chip}
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
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
          />
        </div>

        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleTip}
          disabled={loading}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
        >
          {loading ? "⏳ Opening Payment..." : "💸 Send Tip"}
        </button>

        <p style={styles.secureNote}>🔒 Secured by Razorpay · 100% safe</p>
      </div>
    </div>
  );
}
