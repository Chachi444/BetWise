import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Navbar.css';
import logo from '../assets/logo.png';
import { FaBell, FaUser, FaSignOutAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa"; // For icons

const Navbar = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({ username: "", firstName: "", lastName: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch wallet balance
    axios.get("https://betwise-mjyi.onrender.com/my-wallet", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBalance(res.data.wallet.walletBalance))
      .catch(() => setBalance(0));

    // Fetch user info (from token or backend if you have a /me endpoint)
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    setUser({
      username: userInfo.userName || "",
      firstName: userInfo.firstName || "",
      lastName: userInfo.lastName || ""
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="navbar-center">
        <Link to="/home">Home</Link>
        <Link to="/my-bets">My Bets</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/refer-friend">Refer</Link>
      </div>
      <div className="navbar-right">
  <Link to="/notifications" className="icon-btn" title="Notifications">
    <FaBell size={20} />
  </Link>
  <span className="balance">₦{balance.toLocaleString()}</span>
  <Link to="/deposit" className="icon-btn" title="Deposit">
    <FaPlusCircle size={20} style={{ color: "#16a34a" }} />
  </Link>
  <Link to="/withdraw" className="icon-btn" title="Withdraw">
    <FaMinusCircle size={20} style={{ color: "#e67e22" }} />
  </Link>
  <Link to="/profile" className="icon-btn" title="Profile">
    <FaUser size={20} />
  </Link>
  <Link to="/logout" className="icon-btn" title="Logout">
    <FaSignOutAlt size={20} />
  </Link>
</div>
    </nav>
  );
};

export default Navbar;