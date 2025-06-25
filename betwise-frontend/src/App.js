import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import HomeBody from "./Components/HomeBody";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import AuthenticatedLayout from "./Components/AuthenticatedLayout";
import DepositPage from "./Components/DepositPage";
import PaystackDeposit from "./Components/PaystackDeposit";
import ManualDeposit from "./Components/ManualDeposit";
import ResetPassword from "./Components/ResetPassword";
import ResetPasswordToken from "./Components/ResetPasswordToken";
import Profile from "./Components/Profile";
import Transactions from "./Components/TransactionHistory";
import Logout from "./Components/Logout"; 
import MyBets from "./Components/MyBet"; 
import Notifications from "./Components/Notification"; 
import Leaderboard from "./Components/Leaderboard"; 
import ReferFriend from "./Components/ReferFriend"; 
import AIChat from "./AIChat";
import Support from "./Components/Support";
import SportPage from "./Components/SportPage"; 
import WithdrawPage from "./Components/WithdrawPage";


const soccerMatches = [
  {
    league: "Premier League",
    date: "Jun 23, 2025, 03:00 PM",
    home: {
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/315px-Chelsea_FC.svg.png",
    },
    away: {
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/300px-Liverpool_FC.svg.png",
    },
    odds: ["2.20", "3.30", "2.90"],
    day: "Today",
  },
  {
    league: "La Liga",
    date: "Jun 23, 2025, 05:00 PM",
    home: {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/255px-Real_Madrid_CF.svg.png",
    },
    away: {
      name: "Barcelona",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Escucho_de_Barcelona_SC.svg/285px-Escucho_de_Barcelona_SC.svg.png",
    },
    odds: ["2.50", "3.50", "2.60"],
    day: "Today",
  },
];

const basketballMatches = [
  {
    league: "NBA",
    date: "Jun 24, 2025, 07:00 PM",
    home: {
      name: "Lakers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/375px-Los_Angeles_Lakers_logo.svg.png",
    },
    away: {
      name: "Warriors",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/72/Warriors_F.C._Logo.png",
    },
    odds: ["1.80", "2.00", "2.10"],
    day: "Today",
  },
  {
    league: "EuroLeague",
    date: "Jun 25, 2025, 08:30 PM",
    home: {
      name: "CSKA Moscow",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/fa/CSKA_Moscow_logo.png",
    },
    away: {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/255px-Real_Madrid_CF.svg.png",
    },
    odds: ["2.10", "3.60", "3.00"],
    day: "Tomorrow",
  },
];

const tennisMatches = [
  {
    league: "Wimbledon",
    date: "Jun 26, 2025, 01:00 PM",
    home: {
      name: "Brazil national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png",
    },
    away: {
      name: "Argentina national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png",
    },
    odds: ["1.60", "2.30", "—"],
    day: "Today",
  },

  {
    league: "Wimbledon",
    date: "Jun 26, 2025, 01:00 PM",
    home: {
      name: "Brazil national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png",
    },
    away: {
      name: "Argentina national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png",
    },
    odds: ["1.60", "2.30", "—"],
    day: "Today",
  },

  {
    league: "Wimbledon",
    date: "Jun 26, 2025, 01:00 PM",
    home: {
      name: "Brazil national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png",
    },
    away: {
      name: "Argentina national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png",
    },
    odds: ["1.60", "2.30", "—"],
    day: "Today",
  },

  {
    league: "Wimbledon",
    date: "Jun 26, 2025, 01:00 PM",
    home: {
      name: "Brazil national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png",
    },
    away: {
      name: "Argentina national tennis team",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png",
    },
    odds: ["1.60", "2.30", "—"],
    day: "Today",
  },];
const virtualsMatches = [];
const casinoMatches = [];
const esportsMatches = [];
const specialsMatches = [];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => setIsAuthenticated(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage onLogin={handleSignIn} />
            )
          }
        />

        <Route
          path="/ai-chat"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <AIChat />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/support"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Support />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/sign-up"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <SignUpPage onSignUp={handleSignUp} />
            )
          }
        />
        <Route path="/reset-password/:token" element={<ResetPasswordToken />} />
        <Route
          path="/logout"
          element={<Logout onLogout={() => setIsAuthenticated(false)} />}
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <HomeBody />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/my-bets"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <MyBets />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Notifications />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Leaderboard />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/wallet"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <DepositPage />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/deposit"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <DepositPage />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/paystack"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <PaystackDeposit />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/withdraw"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <WithdrawPage />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/refer-friend"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <ReferFriend />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/manual-deposit"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <ManualDeposit />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <Transactions />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/soccer"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Soccer" matches={soccerMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/basketball"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Basketball" matches={basketballMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/tennis"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Tennis" matches={tennisMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/virtuals"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Virtuals" matches={virtualsMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/casino"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Casino" matches={casinoMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/esports"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="eSports" matches={esportsMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/specials"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout>
                <SportPage sportName="Specials" matches={specialsMatches} />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
