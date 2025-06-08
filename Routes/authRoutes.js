const express = require("express");
require('dotenv').config();
const { handleForgotPassword, handleResetPassword, handleUserLogin, handleUserSignUp, getAllUsers, getAllWallets, walletsByWalletId, myWallet, createGame, getAllGames, updateGameResults, updateBetStatus, createBet, getAllBets, getBetById, viewBetResults, depositMoney, calculatePayouts, myBets, aiChat, updateUserProfile, getUserNotifications, getLeaderboard, referFriend, isAdmin, getAllUsersAdmin, sendSupportMessage, getTransactions } = require("../Controllers");
const { validateRegistration, authorization } = require("../middleware");


const router = express.Router();

router.post ("/sign-up", validateRegistration, handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/forgot-password", handleForgotPassword);
router.patch("/reset-password", authorization, handleResetPassword);
router.get("/users", authorization, getAllUsers);
router.get("/wallets", getAllWallets);
router.get("/wallets/:id", walletsByWalletId);
router.get("/my-wallet", myWallet);
router.post("/create-game", createGame);
router.get("/games", getAllGames);
router.patch("/set-game-results/:id", updateGameResults);
router.patch("/set-bet-status", updateBetStatus);
router.post("/create-bet", createBet);
router.get("/bets", getAllBets);
router.get("/bets/:id", getBetById);
router.get("/view-bet-results", viewBetResults);
router.post("/deposit-money", authorization, depositMoney);
router.get("/calculate-payouts", calculatePayouts);
router.get("/my-bets", myBets);
router.post("/ai-chat", aiChat);
router.patch("/profile", authorization, updateUserProfile);
router.get("/notifications", authorization, getUserNotifications);
router.get("/leaderboard", getLeaderboard);
router.post("/refer", authorization, referFriend);
router.get("/admin/users", authorization, isAdmin, getAllUsersAdmin);
router.post("/support", authorization, sendSupportMessage);
router.get("/transactions", authorization, getTransactions);

module.exports = router;
