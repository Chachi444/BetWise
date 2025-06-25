import React, { useState } from "react";
import axios from "axios";

const PaystackDeposit = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaystack = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !user.email) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      // 1. Initialize transaction on backend
      const res = await axios.post(
        "http://localhost:8000/paystack/initialize",
        { amount: Number(amount), email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { reference } = res.data.data; // Only reference is needed

      // 2. Open Paystack modal
      window.PaystackPop.setup({
        key: "sk_test_89f0a0b8fe8f8a215027ad15565ec09c32fc2f68", // Replace with your Paystack public key
        email: user.email,
        amount: Number(amount) * 100,
        ref: reference,
        callback: async function (response) {
          // 3. Verify transaction on backend
          try {
            await axios.get(
              `https://betwise-mjyi.onrender.com//paystack/verify?reference=${response.reference}`
            );
            setMessage("Deposit successful!");
            setAmount("");
          } catch {
            setMessage("Verification failed. Contact support.");
          }
          setLoading(false);
        },
        onClose: function () {
          setMessage("Payment cancelled.");
          setLoading(false);
        }
      }).openIframe();
    } catch (err) {
      setMessage(err.response?.data?.message || "Paystack error");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Deposit with Paystack</h2>
      <form onSubmit={handlePaystack}>
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
          style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}
        >
          {loading ? "Processing..." : "Deposit with Paystack"}
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: message.includes("success") ? "green" : "red" }}>{message}</div>}
    </div>
  );
};

export default PaystackDeposit;