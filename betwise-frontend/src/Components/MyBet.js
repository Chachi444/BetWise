import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://betwise-mjyi.onrender.com/my-bets", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBets(res.data.bets || []))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Bets</h2>
      {bets.length === 0 ? (
        <div>No bets found.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Game</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Potential Winnings</th>
            </tr>
          </thead>
          <tbody>
            {bets.map(bet => (
              <tr key={bet._id}>
                <td>{bet.gameId?.teams?.join(" vs ")}</td>
                <td>{bet.betAmount}</td>
                <td>{bet.status || "pending"}</td>
                <td>{bet.potentialWinnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBets;