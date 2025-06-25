import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

const BetSlip = ({ game }) => {
  const [betAmount, setBetAmount] = useState("");
  const [betOnTeam, setBetOnTeam] = useState("");
  const [message, setMessage] = useState("");

  const handlePlaceBet = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to place a bet.");
      return;
    }
    if (!betOnTeam) {
      setMessage("Please select a team.");
      return;
    } 
    try {
      await axios.post(`${API_URL}/create-bet`, {
        gameId: game._id,
        betAmount: Number(betAmount),
        betOnTeam
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Bet placed!");
      setBetAmount("");
      setBetOnTeam("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error placing bet");
    }
  };

  return (
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, maxWidth: 350 }}>
      <h3>Place a Bet</h3>
      <div>
        <strong>{game.teams.join(" vs ")}</strong>
      </div>
      <form onSubmit={handlePlaceBet}>
        <div style={{ margin: "12px 0" }}>
          <label>
            <input
              type="radio"
              name="betOnTeam"
              value={game.teams[0]}
              checked={betOnTeam === game.teams[0]}
              onChange={() => setBetOnTeam(game.teams[0])}
            />
            {game.teams[0]}
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              name="betOnTeam"
              value={game.teams[1]}
              checked={betOnTeam === game.teams[1]}
              onChange={() => setBetOnTeam(game.teams[1])}
            />
            {game.teams[1]}
          </label>
        </div>
        <div style={{ margin: "12px 0" }}>
          <input
            type="number"
            placeholder="Bet Amount"
            value={betAmount}
            min={1}
            required
            onChange={e => setBetAmount(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}
        >
          Place Bet
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: message === "Bet placed!" ? "green" : "red" }}>{message}</div>}
    </div>
  );
};

export default BetSlip;