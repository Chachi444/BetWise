import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; 

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTransactions(res.data.transactions || []))
      .catch(() => setTransactions([]));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <div style={{ color: "#888" }}>No transactions found.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={{ padding: 8, textAlign: "left" }}>Date</th>
              <th style={{ padding: 8, textAlign: "left" }}>Type</th>
              <th style={{ padding: 8, textAlign: "right" }}>Amount</th>
              <th style={{ padding: 8, textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td style={{ padding: 8 }}>{tx.date || "--"}</td>
                <td style={{ padding: 8 }}>{tx.type || "--"}</td>
                <td style={{ padding: 8, textAlign: "right" }}>{tx.amount || "--"}</td>
                <td style={{ padding: 8 }}>{tx.status || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;