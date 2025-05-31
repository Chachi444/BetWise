# BetWise 
Sports Betting Platform

## Main Features:


Milestone 1: Project 5 - Sports Betting Platform (BetWise)
Assigned

Milestone 1: User Setup & Game Management



1.Register/login users with wallet balance.



2.Admin can create games with odds.



3.Define User, Game schemas.
# BetWise
Sports Betting Platform

## Table of Contents
- [Features](#features)
- [Milestones](#milestones)
- [Schemas](#schemas)
- [API Endpoints](#api-endpoints)

---

## Features

- User registration and login with wallet balance
- Admin can create games with odds
- Users can place bets on available games
- Bets are deducted from user wallets
- Admin sets game results
- Automatic payout calculation and wallet updates
- Users can view bet history and results

---

## Milestones

### Milestone 1: User Setup & Game Management
1. Register/login users with wallet balance
2. Admin can create games with odds
3. Define User and Game schemas

### Milestone 2: Betting Logic
1. Users place bets on available games *(Done)*
2. Users view bet results
3. Create Bet schema *(Done)*
4. Deduct stake from wallet and record bet

### Milestone 3: Results & Payouts
1. Admin sets game results
2. Calculate payouts and update wallets
3. GET endpoints for viewing bet history and results

---

## Schemas

- **Game:** teams, odds, result
- **Bet:** user, game, outcome, stake, payout

---

## API Endpoints

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login user
- `POST /games` — Create a new game (admin only)
- `GET /games` — List all games
- `POST /bets` — Place a bet
- `GET /bets` — View all bets (bet history)
- `GET /bet-results` — View summarized bet results
- `PATCH /games/:id/result` — Set game result (admin only)
- `GET /wallet` — View wallet balance

---

*Project 5 - Sports Betting Platform (BetWise)*

# Milestone 2: Betting Logic





1.Users place bets on available games. (Done)

2. User view bet results



3.Create Bet schema. (Done)



4.Deduct stake from wallet and record bet.


# MILESTONE 3 - PROJECT 5: Sports Betting Platform (BetWise)
Assigned

# Results & Payouts



Admin sets game results. 


Calculate payouts and update wallets.


GET endpoints for viewing bet history and results.






Schemas:


Game teams, odds, result
Bet user, game, outcome, stake, payout
Endpoints:

POST /auth/register
POST /auth/login
POST /games (admin)
GET /games
POST /bets
GET /bets
PATCH /games/:id/result
GET /wallet