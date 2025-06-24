import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaLifeRing } from "react-icons/fa";

const cardGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 24,
  justifyContent: "flex-start"
};

const cardStyle = {
  flex: "1 1 350px",
  background: "#fff",
  color: "#181f2a",
  borderRadius: 18,
  padding: 28,
  minWidth: 320,
  maxWidth: 420,
  boxSizing: "border-box",
  boxShadow: "0 4px 18px rgba(39,174,96,0.10)",
  border: "2px solid #e8f5e9",
  marginBottom: 16,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const cardHeaderStyle = {
  color: "#27ae60",
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 8
};

const oddsBoxStyle = {
  background: "#e8f5e9",
  color: "#27ae60",
  borderRadius: 8,
  padding: "10px 18px",
  fontWeight: "bold",
  minWidth: 70,
  textAlign: "center",
  fontSize: 16
};

const SportPage = ({ sportName, matches }) => (
  <div style={{ minHeight: "100vh", background: "#f7f7f7", paddingBottom: 80 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      <h2 style={{ color: "#27ae60", fontWeight: "bold", fontSize: 32, marginBottom: 24 }}>
        {sportName} Matches
      </h2>
      <div style={cardGridStyle}>
        {matches.map((match, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={cardHeaderStyle}>{match.league}</div>
            <div style={{ fontSize: 15, color: "#b2c2be", marginBottom: 8 }}>{match.date}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "18px 0" }}>
              <div style={{ textAlign: "center" }}>
                <img src={match.home.logo} alt={match.home.name} width={54} style={{ marginBottom: 6 }} />
                <div style={{ fontWeight: "bold", fontSize: 17 }}>{match.home.name}</div>
              </div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#27ae60" }}>
                {match.score ? match.score : "VS"}
              </div>
              <div style={{ textAlign: "center" }}>
                <img src={match.away.logo} alt={match.away.name} width={54} style={{ marginBottom: 6 }} />
                <div style={{ fontWeight: "bold", fontSize: 17 }}>{match.away.name}</div>
              </div>
            </div>
            {match.minute && (
              <div style={{ color: "#27ae60", fontWeight: "bold", fontSize: 15, marginBottom: 8 }}>
                {match.minute}
              </div>
            )}
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <div style={oddsBoxStyle}>
                Home <br />{match.odds[0]}
              </div>
              <div style={oddsBoxStyle}>
                Draw <br />{match.odds[1]}
              </div>
              <div style={oddsBoxStyle}>
                Away <br />{match.odds[2]}
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#b2c2be" }}>{match.day}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Floating AI Chat Icon (bottom right) */}
    <Link
      to="/ai-chat"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        background: "#27ae60",
        color: "#fff",
        borderRadius: "50%",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        zIndex: 1000,
        fontSize: 28,
        textDecoration: "none",
      }}
      title="AI Chat"
    >
      <FaRobot />
    </Link>

    {/* Floating Support Button (bottom left) */}
    <Link
      to="/support"
      style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        background: "#fff",
        color: "#27ae60",
        border: "2px solid #27ae60",
        borderRadius: 28,
        padding: "10px 22px",
        fontWeight: "bold",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        zIndex: 1000,
        textDecoration: "none",
      }}
      title="Support"
    >
      <FaLifeRing style={{ marginRight: 8 }} />
      Support
    </Link>
  </div>
);

export default SportPage;