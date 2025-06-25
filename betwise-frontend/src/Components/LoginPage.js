import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa"; 
import { API_URL } from "../api"; // Adjust the import based on your project structure

const LOGIN_URL = `${API_URL}/login`;

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(LOGIN_URL, { email, password });
      onLogin && onLogin(res.data);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 12px rgba(39,174,96,0.08)" }}>
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <div style={{ position: "relative", marginBottom: 8 }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            style={{ marginRight: 6 }}
          />
          <label htmlFor="showPassword" style={{ fontSize: 14 }}>Show password</label>
        </div>
        <button type="submit" style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: 12, fontWeight: "bold", fontSize: 16 }}>
          Login
        </button>
      </form>
      <div style={{ textAlign: "right", marginTop: 8 }}>
        <button
          type="button"
          style={{ color: "#4f46e5", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline", fontSize: 15 }}
          onClick={() => navigate("/reset-password")}
        >
          Forgot password?
        </button>
      </div>
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
        onClick={() => alert("Google login not implemented")}
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
        onClick={() => alert("Facebook login not implemented")}
      >
        <FaFacebook style={{ fontSize: 18, color: "#1877F3" }} /> Continue with Facebook
      </button>
      <div style={{ textAlign: "center", marginTop: 18, fontSize: 15 }}>
        Don't have an account?{" "}
        <button
          type="button"
          style={{ color: "#27ae60", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
          onClick={() => navigate("/sign-up")}
        >
          Register here
        </button>
      </div>
    </div>
  );
};

export default LoginPage;