# BetWise 
Sports Betting Platform


Milestone 1: Project 5 - Sports Betting Platform (BetWise)
Assigned

Milestone 1: User Setup & Game Management



1.Register/login users with wallet balance.



2.Admin can create games with odds.



3.Define User, Game schemas.


# Milestone 2: Betting Logic





1.Users place bets on available games. (Done)

2. User view bet results



2.Create Bet schema. (Done)



3.Deduct stake from wallet and record bet.

Payout based on outcomes


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