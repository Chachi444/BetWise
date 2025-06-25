import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api"; 

const Profile = () => {
  const [profile, setProfile] = useState({ email: "", firstName: "", lastName: "", state: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optionally fetch profile from backend if you have a /me endpoint
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setProfile(user);
  }, []);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    if (!token) return setMessage("You must be logged in.");
    try {
      await axios.patch(`${API_URL}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
            });
      setMessage("Profile updated!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={profile.firstName}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={profile.lastName}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={profile.state}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold" }}>
          Update Profile
        </button>
      </form>
      {message && <div style={{ marginTop: 12, color: message.includes("updated") ? "green" : "red" }}>{message}</div>}
    </div>
  );
};

export default Profile;