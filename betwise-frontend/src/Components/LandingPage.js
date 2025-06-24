import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaTrophy, FaChartLine, FaFutbol } from "react-icons/fa";

const carouselSlides = [
  "Welcome to BetWise, your ultimate platform for betting.",
  "Bet Smarter, Win Bigger.",
  "Empowering entrepreneurs to achieve their goal with their winning power."
];

const topMatches = [
  {
    team: "Liverpool",
    opponent: "Arsenal",
    time: "12.30 pm",
    odds: ["2.10", "3.50", "3.30"]
  },
  {
    team: "Dallas",
    opponent: "Arizona",
    time: "3.00 pm",
    odds: ["1.75", "2.10", "5.0"]
  },
  {
    team: "Golden State",
    opponent: "Boston",
    time: "5.00 pm",
    odds: ["1.55", "2.45", "4.0"]
  }
];

const LandingPage = () => {
  const [slide, setSlide] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setSlide(s => (s + 1) % carouselSlides.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#e6f4ea", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 32px", background: "#fff", borderBottom: "1px solid #e8f5e9"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={logo} alt="BetWise" style={{ height: 48, fontWeight: "bold" }} />
          <span style={{ fontWeight: 900, fontSize: 28, color: "#27ae60", letterSpacing: 1 }}>BETWISE</span>
        </div>
        <div>
          <Link to="/sign-up" style={{
            marginRight: 18, color: "#27ae60", fontWeight: "bold", textDecoration: "none", fontSize: 16
          }}>Sign Up</Link>
          <Link to="/login" style={{
            color: "#fff", background: "#27ae60", borderRadius: 6, padding: "8px 22px",
            fontWeight: "bold", textDecoration: "none", fontSize: 16
          }}>Sign In</Link>
        </div>
      </nav>

      {/* Carousel */}
      <div style={{
        maxWidth: 520, margin: "40px auto 0 auto", background: "#d1f5e0",
        borderRadius: 18, padding: "36px 32px", textAlign: "center", minHeight: 120,
        fontSize: 28, color: "#181f2a", fontWeight: 700, boxShadow: "0 2px 12px rgba(39,174,96,0.08)"
      }}>
        {carouselSlides[slide]}
        <div style={{ marginTop: 18 }}>
          {carouselSlides.map((_, idx) => (
            <span key={idx}
              style={{
                display: "inline-block", width: 10, height: 10, borderRadius: "50%",
                background: slide === idx ? "#27ae60" : "#b2c2be", margin: "0 4px"
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Matches */}
      <div style={{
        maxWidth: 520, margin: "40px auto 0 auto", background: "#fff",
        borderRadius: 18, padding: "32px 0 18px 0", boxShadow: "0 2px 12px rgba(39,174,96,0.08)"
      }}>
        <div style={{ fontWeight: "bold", fontSize: 24, color: "#181f2a", marginLeft: 32, marginBottom: 18 }}>
          Top Matches
        </div>
        {topMatches.map((match, idx) => (
          <div key={idx} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#f7f7f7", borderRadius: 12, padding: "16px 24px", margin: "0 24px 16px 24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FaFutbol style={{ color: "#27ae60", fontSize: 28 }} />
              <div>
                <div style={{ fontWeight: "bold", fontSize: 17 }}>{match.team}</div>
                <div style={{ color: "#888", fontSize: 14 }}>{match.opponent}</div>
              </div>
            </div>
            <div style={{ color: "#888", fontWeight: 500, fontSize: 15 }}>{match.time}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {match.odds.map((odd, i) => (
                <div key={i} style={{
                  background: "#e8f5e9", color: "#27ae60", fontWeight: "bold",
                  borderRadius: 8, padding: "6px 14px", fontSize: 16, minWidth: 38, textAlign: "center"
                }}>{odd}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 32, margin: "40px 0"
      }}>
        <div style={{
          background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 320,
          display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 2px 12px rgba(39,174,96,0.08)"
        }}>
          <div style={{
            background: "#27ae60", borderRadius: "50%", width: 64, height: 64,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18
          }}>
            <FaTrophy style={{ color: "#fff", fontSize: 32 }} />
          </div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Celebrate Success</div>
          <div style={{ color: "#444", fontSize: 15, textAlign: "center" }}>
            Turning your passion for sports into big rewards
          </div>
        </div>
        <div style={{
          background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 320,
          display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 2px 12px rgba(39,174,96,0.08)"
        }}>
          <div style={{
            background: "#27ae60", borderRadius: "50%", width: 64, height: 64,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18
          }}>
            <FaChartLine style={{ color: "#fff", fontSize: 32 }} />
          </div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Your Strategy, Your Growth</div>
          <div style={{ color: "#444", fontSize: 15, textAlign: "center" }}>
            Leverage sports betting as a tool for business growth
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "#fff", borderTop: "2px solid #e8f5e9", padding: "18px 0", marginTop: "auto"
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12
        }}>
          <img src={logo} alt="BetWise" style={{ height: 32 }} />
          <span style={{ fontWeight: 900, fontSize: 20, color: "#27ae60", letterSpacing: 1 }}>BETWISE</span>
        </div>
        <div style={{ textAlign: "center", color: "#888", fontSize: 14, marginTop: 6 }}>
          &copy; {new Date().getFullYear()} BETWISE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;