import React, { useState } from "react";
import axios from "axios";

const ManualDeposit = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleManualDeposit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/deposit-money",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Manual deposit successful!");
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Manual deposit failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Manual Deposit</h2>
      <form onSubmit={handleManualDeposit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min={1}
          required
          onChange={e => setAmount(e.target.value)}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: "#888", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}
        >
          {loading ? "Processing..." : "Deposit Manually"}
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: message.includes("success") ? "green" : "red" }}>{message}</div>}
    </div>
  );
};

export default ManualDeposit;