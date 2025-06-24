import React, { useState } from "react";

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    // TODO: Implement withdrawal logic (API call)
    setMessage("Withdrawal request submitted!");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 12px rgba(39,174,96,0.08)", border: "2px solid #e8f5e9" }}>
      <h2 style={{ color: "#27ae60", marginBottom: 24 }}>Withdraw Funds</h2>
      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #e8f5e9", marginBottom: 16 }}
          min="0"
        />
        <button
          type="submit"
          style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: "12px 0", fontWeight: "bold", fontSize: 16, cursor: "pointer" }}
        >
          Withdraw
        </button>
      </form>
      {message && <div style={{ marginTop: 16, color: "#27ae60" }}>{message}</div>}
    </div>
  );
};

export default WithdrawPage;