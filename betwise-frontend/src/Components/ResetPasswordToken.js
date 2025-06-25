import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api"; 

const ResetPasswordToken = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/reset-password`, { token, password });
      setMessage("Password reset successful! You can now log in.");
    } catch {
      setMessage("Reset failed or link expired.");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Set New Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}>
          Reset Password
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: "green" }}>{message}</div>}
    </div>
  );
};

export default ResetPasswordToken;