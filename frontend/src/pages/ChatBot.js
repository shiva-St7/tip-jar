import { useState } from "react";
import axios from "axios";

const styles = {
  // Chat bubble button
  chatButton: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    cursor: "pointer",
    fontSize: "28px",
    boxShadow: "0 4px 20px rgba(102,126,234,0.5)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // Chat window
  chatWindow: {
    position: "fixed",
    bottom: "96px",
    right: "24px",
    width: "340px",
    height: "480px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  // Header
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    margin: 0,
  },
  headerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "12px",
    margin: 0,
  },
  // Messages area
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  // Message bubbles
  userMsg: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "10px 14px",
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "80%",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  botMsg: {
    alignSelf: "flex-start",
    background: "#f0f0f0",
    color: "#333",
    padding: "10px 14px",
    borderRadius: "18px 18px 18px 4px",
    maxWidth: "80%",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  loadingMsg: {
    alignSelf: "flex-start",
    background: "#f0f0f0",
    color: "#999",
    padding: "10px 14px",
    borderRadius: "18px 18px 18px 4px",
    fontSize: "14px",
  },
  // Input area
  inputArea: {
    padding: "12px 16px",
    borderTop: "1px solid #eee",
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    border: "2px solid #e8e8e8",
    borderRadius: "20px",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    padding: "10px 16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
  },
  // Suggested questions
  suggestions: {
    padding: "0 16px 12px",
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  suggestionChip: {
    padding: "6px 12px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "20px",
    fontSize: "12px",
    cursor: "pointer",
    color: "#667eea",
    fontWeight: "600",
  },
};

const SUGGESTIONS = [
  "How do I pay?",
  "Refund policy?",
  "Who is the creator?",
  "Is it secure?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm the Tip Jar assistant. Ask me anything about the app or the creator!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    const q = question || input.trim();
    if (!q) return;

    setMessages((prev) => [...prev, { from: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://tip-jar-backend.onrender.com/chat",
        { question: q },
      );
      setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong. Please try again!" },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Chat popup window */}
      {open && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <span style={{ fontSize: "28px" }}>🤖</span>
            <div>
              <p style={styles.headerText}>Tip Jar Assistant</p>
              <p style={styles.headerSub}>Ask me anything!</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={msg.from === "user" ? styles.userMsg : styles.botMsg}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div style={styles.loadingMsg}>⏳ Thinking...</div>}
          </div>

          {/* Suggested questions */}
          <div style={styles.suggestions}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                style={styles.suggestionChip}
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button style={styles.sendBtn} onClick={() => sendMessage()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button style={styles.chatButton} onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
