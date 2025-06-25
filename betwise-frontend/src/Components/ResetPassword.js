import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await axios.post(`${API_URL}/forget-password`, { email });
      setMessage("If this email exists, a reset link has been sent.");
    } catch {
      setMessage("If this email exists, a reset link has been sent.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleRequest}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: "green" }}>{message}</div>}
    </div>
  );
};

export default ResetPassword;