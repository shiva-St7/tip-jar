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

export default function Terms() {
  const navigate = useNavigate();
  return (
    <div style={pageStyle}>
      <div style={container}>
        <button style={backBtn} onClick={() => navigate("/")}>
          ← Back to Tip Jar
        </button>
        <h1 style={h1}>Terms & Conditions</h1>
        <p style={p}>Last updated: June 2026</p>

        <h2 style={h2}>1. Acceptance of Terms</h2>
        <p style={p}>
          By using Tip Jar, you agree to these Terms and Conditions. If you do
          not agree, please do not use our service.
        </p>

        <h2 style={h2}>2. Service Description</h2>
        <p style={p}>
          Tip Jar is a platform that allows users to send monetary tips to
          creators. All payments are voluntary and non-refundable unless stated
          otherwise in our Refund Policy.
        </p>

        <h2 style={h2}>3. Payment Terms</h2>
        <p style={p}>
          All payments are processed securely through Razorpay. By making a
          payment, you confirm that you are the authorized holder of the payment
          method used. Minimum tip amount is ₹1.
        </p>

        <h2 style={h2}>4. User Responsibilities</h2>
        <p style={p}>
          You agree not to use Tip Jar for any unlawful purpose. You are
          responsible for ensuring that all payment information provided is
          accurate and complete.
        </p>

        <h2 style={h2}>5. Limitation of Liability</h2>
        <p style={p}>
          Tip Jar is not responsible for any failed transactions due to
          incorrect payment details provided by the user. In case of technical
          issues, please contact us immediately.
        </p>

        <h2 style={h2}>6. Changes to Terms</h2>
        <p style={p}>
          We reserve the right to modify these terms at any time. Continued use
          of the service after changes constitutes acceptance of the new terms.
        </p>

        <h2 style={h2}>7. Contact</h2>
        <p style={p}>
          For any queries regarding these terms, contact us at: shivam@email.com
        </p>
      </div>
    </div>
  );
}
