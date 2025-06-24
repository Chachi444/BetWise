import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens/user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    // Redirect to login or landing page
    navigate("/login");
  }, [navigate, onLogout]);

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;