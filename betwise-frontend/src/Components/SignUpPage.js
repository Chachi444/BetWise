import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa"; 
import { API_URL } from "../api"; 

const SIGN_UP_URL = `${API_URL}/sign-up`;

const SignUpPage = ({ onSignUp }) => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    state: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(API_URL, { ...form, isAdmin: false });
      onSignUp && onSignUp();
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 12px rgba(39,174,96,0.08)" }}>
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          required
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <div style={{ position: "relative", marginBottom: 8 }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={handleChange}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            style={{ marginRight: 6 }}
          />
          <label htmlFor="showPassword" style={{ fontSize: 14 }}>Show password</label>
        </div>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold", fontSize: 16 }}>
          Register
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      <div style={{ display: "flex", alignItems: "center", margin: "24px 0 16px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#eee" }} />
        <span style={{ margin: "0 12px", color: "#888", fontWeight: "bold" }}>OR</span>
        <div style={{ flex: 1, height: 1, background: "#eee" }} />
      </div>
      <button
        type="button"
        style={{
          width: "100%",
          background: "#fff",
          color: "#222",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 10,
          fontWeight: "bold",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={() => alert("Google signup not implemented")}
      >
        <FaGoogle style={{ fontSize: 18, color: "#DB4437" }} /> Continue with Google
      </button>
      <button
        type="button"
        style={{
          width: "100%",
          background: "#fff",
          color: "#222",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 10,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={() => alert("Facebook signup not implemented")}
      >
         <FaFacebook style={{ fontSize: 18, color: "#1877F3" }} /> Continue with Facebook
      </button>
      <div style={{ textAlign: "center", marginTop: 18, fontSize: 15 }}>
        Already have an account?{" "}
        <button
          type="button"
          style={{ color: "#27ae60", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;