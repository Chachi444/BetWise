import React from "react";
import { Link } from "react-router-dom";
import { FaLifeRing, FaRobot } from "react-icons/fa";
import BetSlip from "./BetSlip";

const sports = [
  { name: "Live", icon: "🟢" },
  { name: "Soccer", icon: "⚽" },
  { name: "Basketball", icon: "🏀" },
  { name: "Tennis", icon: "🎾" },
  { name: "Virtuals", icon: "💻" },
  { name: "Casino", icon: "🎰" },
  { name: "eSports", icon: "🎮" },
  { name: "Specials", icon: "⭐" },
];

// Demo data for live matches
const liveMatches = [
  {
    league: "NWSL Women",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "North Carolina Courage ", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/North_Carolina_Courage_logo.svg/240px-North_Carolina_Courage_logo.svg.png" },
    away: { name: "Houston Dash ", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Houston_Dash_2020_logo.svg/240px-Houston_Dash_2020_logo.svg.png" },
    score: "0 - 1",
    minute: "11' LIVE"
  },
  {
    league: "USL Championship",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "Charleston Battery", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Charleston_Battery_%282020%29_logo.svg/285px-Charleston_Battery_%282020%29_logo.svg.png" },
    away: { name: "New Mexico United", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/New_Mexico_United_logo.svg/270px-New_Mexico_United_logo.svg.png" },
    score: "1 - 0",
    minute: "12' LIVE"
  },
  {
    league: "USL League Two",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "SC United Bantams", logo: "https://upload.wikimedia.org/wikipedia/en/1/17/Logo_for_SC_United_Bantams_%28PDL_franchise%29.jpg" },
    away: { name: "North Carolina FC", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/North_Carolina_FC_logo.svg/240px-North_Carolina_FC_logo.svg.png" },
    score: "0 - 0",
    minute: "13' LIVE"
  },
  {
    league: "MLS Next Pro",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "Carolina Core", logo: "https://upload.wikimedia.org/wikipedia/en/d/d0/Carolina_Core_FC_Logo.png"},
    away: { name: "New York RB II", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/New_York_Red_Bulls_II_crest.svg/375px-New_York_Red_Bulls_II_crest.svg.png" },
    score: "0 - 0",
    minute: "15' LIVE"
  },
  {
    league: "USL League Two",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "Louisville City FC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Louisville_City_FC_2020_logo_primary.svg/270px-Louisville_City_FC_2020_logo_primary.svg.png" },
    away: { name: "Annapolis Blues", logo: "https://upload.wikimedia.org/wikipedia/en/1/10/Annapolis_Blues_FC_Logo.png" },
    score: "0 - 2",
    minute: "18' LIVE"
  },
  {
    league: "Serie B",
    date: "Jun 22, 2025, 12:30 AM",
    home: { name: "Ferroviária", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png/500px-Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png" },
    away: { name: "United FC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/United_FC.svg/500px-United_FC.svg.png" },
    score: "0 - 0",
    minute: "18' LIVE"
  }
];

// Demo data for matches & results
const matchesResults = [
  {
    league: "Champions League Qualification",
    date: "Jul 8, 2025, 06:00 PM",
    home: { name: "FC Iberia 1999", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Saburtalo_Tbilisi_Logo.png/315px-Saburtalo_Tbilisi_Logo.png" },
    away: { name: "Malmö FF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Malmo_FF_logo.svg/300px-Malmo_FF_logo.svg.png" },
    odds: ["4.50", "3.80", "1.70"]
  },
  {
    league: "Champions League Qualification",
    date: "Jul 8, 2025, 07:00 PM",
    home: { name: "NK Olimpija Ljubljana", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/NK_Olimpija_Ljubljana_logo.svg/240px-NK_Olimpija_Ljubljana_logo.svg.png" },
    away: { name: "FC Kairat", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/FC_Kairat_logo.svg/225px-FC_Kairat_logo.svg.png" },
    odds: ["1.90", "3.40", "3.90"]
  },
  {
    league: "Champions League Qualification",
    date: "Jul 8, 2025, 08:00 PM",
    home: { name: "PFC Ludogorets Razgrad", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/PFC_Ludogorets_Razgrad_logo.png" },
    away: { name: "FC Dinamo Minsk", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Dinamo_Minsk_logo.svg/293px-Dinamo_Minsk_logo.svg.png" },
    odds: ["1.40", "4.80", "7.00"]
  },
  {
    league: "Premier League",
    date: "Aug 16, 2025, 05:30 PM",
    home: { name: "Wolverhampton Wanderers", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Wolverhampton_Wanderers_FC_crest.svg/330px-Wolverhampton_Wanderers_FC_crest.svg.png" },
    away: { name: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/315px-Manchester_City_FC_badge.svg.png" },
    odds: ["8.00", "5.50", "1.35"]
  }
];

// Demo data for upcoming matches
const upcomingMatches = [
  {
    league: "Premier League",
    date: "Jun 23, 2025, 03:00 PM",
    home: { name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/315px-Chelsea_FC.svg.png" },
    away: { name: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/300px-Liverpool_FC.svg.png" },
    odds: ["2.20", "3.30", "2.90"],
    day: "Today"
  },
  {
    league: "La Liga",
    date: "Jun 23, 2025, 05:00 PM",
    home: { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/255px-Real_Madrid_CF.svg.png" },
    away: { name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Escudo_de_Barcelona_SC.svg/285px-Escudo_de_Barcelona_SC.svg.png" },
    odds: ["2.50", "3.50", "2.60"],
    day: "Today"
  },
  {
    league: "Serie A",
    date: "Jun 24, 2025, 07:00 PM",
    home: { name: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/195px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png" },
    away: { name: "Napoli", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SSC_Napoli_2024_%28deep_blue_navy%29.svg/330px-SSC_Napoli_2024_%28deep_blue_navy%29.svg.png" },
    odds: ["2.80", "3.20", "2.40"],
    day: "Tomorrow"
  },
  {
    league: "Bundesliga",
    date: "Jun 24, 2025, 08:30 PM",
    home: { name: "Bayern Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/330px-FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg.png" },
    away: { name: "Borussia Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/500px-Borussia_Dortmund_logo.svg.png" },
    odds: ["2.10", "3.60", "3.00"],
    day: "Tomorrow"
  },
  {
    league: "Ligue 1",
    date: "Jun 25, 2025, 06:00 PM",
    home: { name: "PSG", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/315px-Paris_Saint-Germain_F.C..svg.png" },
    away: { name: "Borussia Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/500px-Borussia_Dortmund_logo.svg.png" },
    odds: ["2.10", "3.60", "3.00"],
    day: "Tomorrow"
  },
  {
    league: "Eredivisie",
    date: "Jun 25, 2025, 08:00 PM",
    home: { name: "Ajax", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/345px-Ajax_Amsterdam.svg.png" },
    away: { name: "PSV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/PSV_Chemnitz_Logo.svg/330px-PSV_Chemnitz_Logo.svg.png" },
    odds: ["2.60", "3.40", "2.70"],
    day: "Tomorrow"
  }
];

const footerLinkStyle = {
  color: "#b2c2be",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  transition: "color 0.2s",
  marginRight: 8,
};

const cardGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  justifyContent: "flex-start"
};

const cardStyle = {
  flex: "1 1 320px",
  background: "#fff",
  color: "#181f2a",
  borderRadius: 16,
  padding: 20,
  minWidth: 280,
  maxWidth: 350,
  boxSizing: "border-box",
  boxShadow: "0 2px 12px rgba(39,174,96,0.08)",
  border: "2px solid #e8f5e9"
};

const cardHeaderStyle = {
  color: "#27ae60",
  fontWeight: "bold",
  fontSize: 14,
  marginBottom: 4
};

const oddsBoxStyle = {
  background: "#e8f5e9",
  color: "#27ae60",
  borderRadius: 6,
  padding: "6px 14px",
  fontWeight: "bold",
  minWidth: 60,
  textAlign: "center"
};

const HomeBody = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Sports Card Bar (no sidebar, links only) */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: 16,
        margin: "24px 24px 0 24px",
        padding: "18px 32px",
        boxShadow: "0 2px 12px rgba(39,174,96,0.08)",
        border: "2px solid #e8f5e9",
        gap: 32
      }}>
        <span style={{ fontWeight: "bold", color: "#27ae60", fontSize: 18, marginRight: 24 }}>SPORTS</span>
        {sports.map((sport) => (
          <Link
            key={sport.name}
            to={`/${sport.name.toLowerCase()}`}
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: sport.name === "Live" ? "bold" : "normal",
              color: sport.name === "Live" ? "#16a34a" : "#181f2a",
              fontSize: 16,
              marginRight: 18,
              background: sport.name === "Live" ? "#e8f5e9" : "#fff",
              borderRadius: 8,
              padding: "6px 14px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(39,174,96,0.04)",
              border: sport.name === "Live" ? "2px solid #27ae60" : "2px solid #e8f5e9",
              transition: "background 0.2s, color 0.2s"
            }}
          >
            <span style={{ marginRight: 8, fontSize: 20 }}>{sport.icon}</span>
            {sport.name}
          </Link>
        ))}
      </div>


      {/* Main Content */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Main Content */}
        <main style={{ flex: 1, padding: 24, display: "flex", gap: 24 }}>
          {/* Center Column */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Live Matches */}
            <section style={{ background: "transparent", borderRadius: 12, padding: 0, marginBottom: 16 }}>
              <div style={{ fontWeight: "bold", marginBottom: 12, color: "#27ae60", fontSize: 20 }}>Live Matches</div>
              <div style={cardGridStyle}>
                {liveMatches.map((match, idx) => (
                  <div key={idx} style={cardStyle}>
                    <div style={cardHeaderStyle}>{match.league}</div>
                    <div style={{ fontSize: 13, color: "#b2c2be", float: "right" }}>{match.date}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.home.logo} alt={match.home.name} width={48} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.home.name}</div>
                      </div>
                      <div style={{ fontSize: 28, fontWeight: "bold", color: "#27ae60" }}>{match.score}</div>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.away.logo} alt={match.away.name} width={48} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.away.name}</div>
                      </div>
                    </div>
                    <div style={{ color: "#27ae60", fontWeight: "bold", fontSize: 13 }}>{match.minute}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <Link to="/live-matches" style={{
                  color: "#27ae60",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: 15
                }}>
                  More Live Matches &rarr;
                </Link>
              </div>
            </section>

            {/* Upcoming Matches as Cards */}
            <section style={{ background: "transparent", borderRadius: 12, padding: 0, marginBottom: 16 }}>
              <div style={{ fontWeight: "bold", marginBottom: 12, color: "#27ae60", fontSize: 20 }}>Upcoming Matches</div>
              <div style={cardGridStyle}>
                {upcomingMatches.map((match, idx) => (
                  <div key={idx} style={cardStyle}>
                    <div style={cardHeaderStyle}>{match.league}</div>
                    <div style={{ fontSize: 13, color: "#b2c2be", float: "right" }}>{match.date}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.home.logo} alt={match.home.name} width={40} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.home.name}</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: "bold", color: "#27ae60" }}>VS</div>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.away.logo} alt={match.away.name} width={40} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.away.name}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
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
                    <div style={{ marginTop: 8, fontSize: 13, color: "#b2c2be" }}>{match.day}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <Link to="/upcoming-matches" style={{
                  color: "#27ae60",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: 15
                }}>
                  More Upcoming Matches &rarr;
                </Link>
              </div>
            </section>

            {/* Matches & Results as Cards */}
            <section style={{ background: "transparent", borderRadius: 12, padding: 0 }}>
              <div style={{ fontWeight: "bold", marginBottom: 12, color: "#27ae60", fontSize: 20 }}>Matches & Results</div>
              <div style={cardGridStyle}>
                {matchesResults.map((match, idx) => (
                  <div key={idx} style={cardStyle}>
                    <div style={cardHeaderStyle}>{match.league}</div>
                    <div style={{ fontSize: 13, color: "#b2c2be", float: "right" }}>{match.date}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.home.logo} alt={match.home.name} width={48} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.home.name}</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: "bold", color: "#27ae60" }}>VS</div>
                      <div style={{ textAlign: "center" }}>
                        <img src={match.away.logo} alt={match.away.name} width={48} style={{ marginBottom: 4 }} />
                        <div style={{ fontWeight: "bold" }}>{match.away.name}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
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
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <Link to="/matches-results" style={{
                  color: "#27ae60",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: 15
                }}>
                  More Matches & Results &rarr;
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column: Bet Slip */}
          <aside style={{ flex: 1, background: "#fff", borderRadius: 16, padding: 20, minWidth: 260, height: "fit-content", boxShadow: "0 2px 12px rgba(39,174,96,0.08)", border: "2px solid #e8f5e9" }}>
            <div style={{ fontWeight: "bold", marginBottom: 12, color: "#27ae60" }}>BET SLIP</div>
            <div style={{ color: "#888", marginBottom: 24 }}>No bets added</div>
            <button style={{
              width: "100%",
              background: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "12px 0",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}>
              Place Bet
            </button>
          </aside>
        </main>
      </div>

      {/* Footer */}
      <footer style={{
        background: "#27ae60",
        color: "#fff",
        padding: "32px 0 16px 0",
        marginTop: 32,
        borderTop: "4px solid #27ae60"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 32px"
        }}>
          {/* Left Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="#" style={footerLinkStyle}>About</a>
              <a href="#" style={footerLinkStyle}>Help Center</a>
              <a href="#" style={footerLinkStyle}>Terms</a>
              <a href="#" style={footerLinkStyle}>Responsible Gaming</a>
              <a href="#" style={footerLinkStyle}>Contact</a>
              <a href="#" style={footerLinkStyle}>Privacy Policy</a>
              <a href="#" style={footerLinkStyle}>FAQ</a>
              <a href="#" style={footerLinkStyle}>Careers</a>
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "#fff" }}>
              &copy; {new Date().getFullYear()} BETWISE. All rights reserved.
            </div>
          </div>

          {/* App Badges and Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  style={{ height: 40 }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: 40 }}
                />
              </a>
            </div>
            <div style={{ marginTop: 24, fontWeight: "bold", color: "#27ae60", letterSpacing: 1, fontSize: 18 }}>
              <span style={{ marginRight: 8, fontSize: 22 }}></span>BETWISE
            </div>
          </div>
        </div>
      </footer>

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
};

export default HomeBody;