

import React, { useState, useEffect } from 'react';
import './HomeBody.css';



const carouselMessages = [
  {
    title: "Welcome to BetWise",
    text: "Your smart betting companion. Bet responsibly and win big",
  },
  {
    title: "Fast Payouts",
    text: "Withdraw your winnings instantly and securely.",
  },
  {
    title: "Live Matches",
    text: "Bet on live games and enjoy real-time updates.",
  },
];

const HomeBody = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselMessages.length);
    }, 3000); // Change message every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-body">
      <div className="welcome-carousel">
        <h1>{carouselMessages[current].title}</h1>
        <p>{carouselMessages[current].text}</p>
      </div>
      <div className="featured-matches">
        <h2>Featured Matches</h2>
        <div className="matches-list">
          <div className="match-card">Match 1</div>
          <div className="match-card">Match 2</div>
          <div className="match-card">Match 3</div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;



import React, { useState, useEffect } from 'react';
import './HomeBody.css';


const API_URL = "http://localhost:8080/live-matches"; // Your backend endpoint

const HomeBody = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setMatches(data.result);
        } else {
          setError('No matches found.');
        }
      })
      .catch(err => {
        setError('Failed to fetch matches');
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div>
      <h2>Live Matches</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {matches.length === 0 && !error && <div>Loading matches...</div>}
        {matches.map(match => (
          <div key={match.event_key}>
            <div>{match.event_home_team} vs {match.event_away_team}</div>
            <div>{match.event_date} {match.event_time}</div>
            <div>Score: {match.event_final_result}</div>
            <div>League: {match.league_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;

import React, {  useEffect } from 'react';
import './HomeBody.css';


const API_BASE = "http://localhost:8000/api/football";

const HomeBody = () => {
  useEffect(() => {
    fetch(`${API_BASE}/rounds/339273`)
      .then(res => res.json())
      .then(data => console.log("Round with Fixtures:", data));

    fetch(`${API_BASE}/fixtures/19135045/basic`)
      .then(res => res.json())
      .then(data => console.log("Fixture Details (Basic):", data));

    fetch(`${API_BASE}/fixtures/19135045/full`)
      .then(res => res.json())
      .then(data => console.log("Fixture Details (Full):", data));

    fetch(`${API_BASE}/schedules/teams/18`)
      .then(res => res.json())
      .then(data => console.log("Team Schedules:", data));

    fetch(`${API_BASE}/fixtures/head-to-head/18/63`)
      .then(res => res.json())
      .then(data => console.log("Head to Head:", data));

    fetch(`${API_BASE}/teams/18`)
      .then(res => res.json())
      .then(data => console.log("Team Details:", data));
  }, []);

  return (
    <div>
      <h2>Welcome to HomeBody</h2>
      <p>Check your browser console for API results.</p>
    </div>
  );
};

export default HomeBody;