import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; // Adjust the import based on your project structure

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setLeaderboard(res.data.leaderboard || []));
  }, []);
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div>No leaderboard data.</div>
      ) : (
        <ol>
          {leaderboard.map((user, i) => (
            <li key={i}>{user.username || user.name} - {user.score || user.points}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;