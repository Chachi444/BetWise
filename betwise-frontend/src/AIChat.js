import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./api"; 

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${API_URL}/ai-chat`, { message: input }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(msgs => [...msgs, { role: "ai", content: res.data.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { role: "ai", content: "Error from AI." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>AI Chat</h2>
      <div style={{ minHeight: 200, border: "1px solid #ccc", padding: 16, marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ color: msg.role === "user" ? "#333" : "#27ae60" }}>
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ width: "80%", padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 8, marginLeft: 8 }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;