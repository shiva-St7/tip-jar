import { useNavigate } from "react-router-dom";

const pageStyle = {
  minHeight: "100vh",
  background: "#f9f9f9",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "40px 20px",
};
const container = {
  maxWidth: "700px",
  margin: "0 auto",
  background: "white",
  borderRadius: "16px",
  padding: "40px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};
const h1 = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a1a2e",
  marginBottom: "8px",
};
const h2 = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginTop: "24px",
};
const p = { fontSize: "15px", color: "#555", lineHeight: "1.7" };
const backBtn = {
  marginBottom: "24px",
  padding: "10px 20px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div style={pageStyle}>
      <div style={container}>
        <button style={backBtn} onClick={() => navigate("/")}>
          ← Back to Tip Jar
        </button>
        <h1 style={h1}>Privacy Policy</h1>
        <p style={p}>Last updated: June 2026</p>

        <h2 style={h2}>1. Information We Collect</h2>
        <p style={p}>
          When you make a payment through Tip Jar, we collect your name, email
          address, and phone number provided during the payment process. This
          information is collected by Razorpay, our payment processor, and is
          subject to their privacy policy.
        </p>

        <h2 style={h2}>2. How We Use Your Information</h2>
        <p style={p}>
          We use the information collected solely to process your payment and
          send you a payment confirmation. We do not sell, trade, or share your
          personal information with third parties except as required to process
          your payment.
        </p>

        <h2 style={h2}>3. Payment Security</h2>
        <p style={p}>
          All payments are processed securely through Razorpay. We do not store
          your card details or banking information on our servers. All
          transactions are encrypted using SSL technology.
        </p>

        <h2 style={h2}>4. Cookies</h2>
        <p style={p}>
          Our website does not use cookies to track personal information. Basic
          session data may be stored temporarily to ensure the payment process
          works correctly.
        </p>

        <h2 style={h2}>5. Contact Us</h2>
        <p style={p}>
          If you have any questions about this Privacy Policy, please contact us
          at: shivamtiwaricr7@gmail.com
        </p>
      </div>
    </div>
  );
}
