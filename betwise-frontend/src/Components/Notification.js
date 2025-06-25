import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setNotifications(res.data.notifications || []));
  }, []);
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <div>No notifications.</div>
      ) : (
        <ul>
          {notifications.map((n, i) => (
            <li key={i}>{n.message || n}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;