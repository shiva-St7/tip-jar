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

export default function Refund() {
  const navigate = useNavigate();
  return (
    <div style={pageStyle}>
      <div style={container}>
        <button style={backBtn} onClick={() => navigate("/")}>
          ← Back to Tip Jar
        </button>
        <h1 style={h1}>Refund & Cancellation Policy</h1>
        <p style={p}>Last updated: June 2026</p>

        <h2 style={h2}>1. General Policy</h2>
        <p style={p}>
          All tips made through Tip Jar are voluntary contributions. As tips are
          non-returnable by nature, we generally do not offer refunds once a
          payment has been successfully processed.
        </p>

        <h2 style={h2}>2. Exceptions</h2>
        <p style={p}>
          Refunds may be considered in the following cases: duplicate payments,
          technical errors causing incorrect amount deduction, or unauthorized
          transactions. Each case will be reviewed individually.
        </p>

        <h2 style={h2}>3. How to Request a Refund</h2>
        <p style={p}>
          To request a refund, contact us at shivam@email.com within 7 days of
          the transaction with your payment ID and reason for refund. We will
          respond within 3-5 business days.
        </p>

        <h2 style={h2}>4. Refund Process</h2>
        <p style={p}>
          Approved refunds will be processed within 5-7 business days and
          credited back to the original payment method. Razorpay processing fees
          may not be refundable.
        </p>

        <h2 style={h2}>5. Cancellations</h2>
        <p style={p}>
          Once a payment is initiated and completed, it cannot be cancelled. If
          you accidentally made a payment, please contact us immediately at
          shivam@email.com
        </p>
      </div>
    </div>
  );
}
