import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; 

const Support = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/support`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse("Support message sent!");
      setMessage("");
    } catch {
      setResponse("Failed to send support message.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Contact Support</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
          style={{ width: "100%", minHeight: 80, marginBottom: 12, padding: 8 }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#27ae60", color: "#fff", border: "none", borderRadius: 6 }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {response && <div style={{ marginTop: 12 }}>{response}</div>}
    </div>
  );
};

export default Support;