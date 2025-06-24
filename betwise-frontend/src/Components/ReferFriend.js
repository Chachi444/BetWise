import React, { useState } from "react";
import axios from "axios";

const ReferFriend = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8000/refer-friend", { email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Referral sent!");
    } catch {
      setMessage("Failed to send referral.");
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Refer a Friend</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Friend's email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#27ae60", color: "#fff", border: "none", borderRadius: 6 }}>
          Send Referral
        </button>
      </form>
      {message && <div style={{ marginTop: 12 }}>{message}</div>}
    </div>
  );
};

export default ReferFriend;