# BetWise - Sports Betting Platform

## Overview

**BetWise** is a full-stack sports betting platform that allows users to register, deposit funds, place bets on games, and view their betting history and results. Admins can create games, set results, and trigger automatic payouts. The platform is built with Node.js, Express, MongoDB, and Mongoose.


## Table of Contents

 Features
 Architecture
 Schemas
 API Endpoints
 Service Layer
 Authentication & Authorization
 Setup & Installation
 Usage
 Contributing
 License



## Features

User registration and login with JWT authentication
Wallet management (deposit, balance tracking)
Admin can create games with odds and set results
Users can place bets on available games
Bets are deducted from user wallets
Automatic payout calculation and wallet updates
Users can view bet history and results
Secure password reset via email



## Architecture

 **Backend:** Node.js, Express
 **Database:** MongoDB (with Mongoose ODM)
 **Authentication:** JWT (JSON Web Tokens)
 **Email:** Nodemailer for password reset



## Schemas

### User (`authModel.js`)
 `email`: String, required, unique
 `username`: String, required, unique
 `firstName`: String
 `lastName`: String
 `password`: String (hashed)
 `state`: String
 `isAdmin`: Boolean

### Wallet (`walletModel.js`)
 `userId`: ObjectId (references User)
 `walletBalance`: Number
 `currency`: String
 `state`: String

### Game (`gameModel.js`)
 `sportName`: String
 `gameType`: String
 `teams`: [String] (exactly two)
 `winningTeam`: { team: String, score: Number }
 `losingTeam`: { team: String, score: Number }
 `odds`: Number
 `gameStatus`: Boolean (true = ongoing, false = completed)
 `results`: [Number]
 `gameDate`: Date
 `gameTime`: Date
 `gameDuration`: String

### Bet (`betModel.js`)
 `userId`: ObjectId (references User)
 `gameId`: ObjectId (references Game)
 `betAmount`: Number
 `betType`: String
 `betOnTeam`: String
 `potentialWinnings`: Number
 `betStatus`: String (pending, won, lost)


## API Endpoints

### Auth & User

 `POST /auth/register` — Register a new user
 `POST /auth/login` — Login user
 `POST /auth/forgot-password` — Request password reset
 `PATCH /auth/reset-password` — Reset password

### Wallet

 `GET /my-wallet` — View logged-in user's wallet
 `POST /deposit-money` — Deposit funds into wallet

### Games (Admin)

 `POST /create-game` — Create a new game (admin only)
 `GET /games` — List all games
 `PATCH /set-game-results/:id` — Set game result (admin only)

### Bets

 `POST /create-bet` — Place a bet
 `GET /my-bets` — View all bets (history and results)
 `GET /bets/:id` — View a specific bet

### Payouts
 `POST /calculate-payouts` — Calculate and distribute payouts for a game


## Service Layer

The index.js file provides reusable functions for fetching data:
 `findUsers()` — Get all users
 `findWallets()` — Get all wallets
 `findBets()` — Get all bets
 `findGames()` — Get all games

## Authentication & Authorization

 **JWT** is used for authentication. Protected routes require a valid token in the `Authorization` header.
 **Authorization middleware** ensures only authenticated users (and admins for certain routes) can access protected endpoints.


## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/BetWise.git
   cd BetWise
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a .env file with:
   
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   ACCESS_TOKEN=your_jwt_secret
   REFRESH_TOKEN=your_jwt_refresh_secret
   EMAIL=your_email@example.com
   EMAIL_PASSWORD=your_email_password
  

4. **Start the server:**
   ```sh
   npm run dev
   ```



## Usage

 Register or login to get a JWT token.
 Use the token in the `Authorization` header for protected routes.
 Admin users can create games and set results.
 Users can deposit money, place bets, and view their bet history and results.


## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


## License

MIT



**BetWise** — Project 5, Sports Betting Platform.


# POSTMAN DOCUMENTATION LINK
` https://documenter.getpostman.com/view/44816262/2sB2x3msod`