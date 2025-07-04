const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const Auth = require("../Models/authModel");
const Bet = require("../Models/betModel");
const Game = require("../Models/gameModel");
const { findBets, findWallets, findUsers, findGames } = require("../Service");
const Wallet = require("../Models/walletModel");
const sendForgotPasswordEmail = require("../utils/sendForgotPasswordEmail");

const handleUserSignUp = async (req, res) => {
  try {
    const { email, username, firstName, lastName, password, state, isAdmin } =
      req.body;

    // Validation
    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Invalid or missing email" });
    }
    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Invalid or missing username" });
    }
    if (firstName && typeof firstName !== "string") {
      return res.status(400).json({ message: "Invalid or missing first name" });
    }
    if (lastName && typeof lastName !== "string") {
      return res.status(400).json({ message: "Invalid or missing last name" });
    }
    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid or missing password" });
    }
    if (state && typeof state !== "string") {
      return res.status(400).json({ message: "Invalid or missing state" });
    }
    if (isAdmin && typeof isAdmin !== "boolean") {
      return res.status(400).json({ message: "Invalid or missing isAdmin" });
    }

    // Check if user already exists via email
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if username already exists via username
    const existingUserName = await Auth.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //Password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // new user creation to database
    const newUser = new Auth({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
      state,
      isAdmin,
    });

    await newUser.save();

    // Create a wallet for the new user
    const newWallet = new Wallet({
      userId: newUser._id,
      walletBalance: 0,
      currency: "NGN",
      state,
    });

    await newWallet.save();

    res.status(201).json({
      message: "Success",
      newUser: {
        email,
        firstName,
        lastName,
        state,
        isAdmin,
        username,
      },

      newWallet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error completing sign up",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.user);

  const allUser = await Auth.find(); // or findUser()

  res.status(200).json({
    message: "All users fetched successfully",
    allUser,
  });
};

const handleUserLogin = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await Auth.findOne({ email }); //.select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // const userName = await Auth.findOne({ username }); //.select("-password");

  // if (!userName) {
  //   return res.status(400).json({ message: "User not found" });
  // }
  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  //Generate a token (verifying users before they can access account)
  const access_token = jwt.sign({ id: user?._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "9h",
  });

  //Generate a refresh token (verifying users before they can access account)
  const refresh_token = jwt.sign({ id: user?._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  // Response of user successfully loging in
  res.status(200).json({
    message: "Login successful",
    access_token, //accessToken
    user: {
      email: user?.email,
      userName: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      state: user?.state,
      isAdmin: user?.isAdmin,
    },

    refresh_token, //refreshToken
  });
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await Auth.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send the user a mail with the token

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });

  await sendForgotPasswordEmail(email, accessToken); // <-- Send the email with the token

  // Send OTP to the user

  res.status(200).json({ message: "Check Your mail" });
};

const handleResetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};

const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find(); //.select("-password");
    res.status(200).json({ message: "Wallets", wallets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const walletsByWalletId = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json({ message: "Wallet details", wallet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wallet details", error: error.message });
  }
};
const myWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json({ message: "Wallet details", wallet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wallet", error: error.message });
  }
};

const createGame = async (req, res) => {
  try {
    const { sportName, gameType, teams, odds, gameDate, gameTime } = req.body;

    // Validation
    if (sportName && typeof sportName !== "string") {
      return res.status(400).json({ message: "Invalid or missing sport name" });
    }
    if (gameType && typeof gameType !== "string") {
      return res.status(400).json({ message: "Invalid or missing game type" });
    }
    if (!teams || !Array.isArray(teams) || teams.length < 2) {
      return res.status(400).json({ message: "Invalid or missing teams" });
    }
    if (!odds || typeof odds !== "number") {
      return res.status(400).json({ message: "Invalid or missing odds" });
    }

    if (gameDate && typeof gameDate !== "string") {
      return res.status(400).json({ message: "Invalid or missing game date" });
    }

    if (gameTime && typeof gameTime !== "string") {
      return res.status(400).json({ message: "Invalid or missing game time" });
    }

    // Check if the game already exists
    const existingGame = await Game.findOne({
      teams: { $all: teams },

      gameDate,
      gameTime,
    });

    if (existingGame) {
      return res.status(400).json({ message: "Game already exists" });
    }

    //confirm admin status
    const user = await Auth.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    //Create a new game

    const newGame = new Game({
      sportName,
      gameType,
      teams,
      odds,
      gameDate,
      gameTime,
      adminId: req.user.id,
    });

    await newGame.save();

    res.status(201).json({
      message: "Game created successfully",
      newGame,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating game",
      error: error.message,
    });
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find(); //.select("-password");
    res.status(200).json({ message: "Games", games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching games", error: error.message });
  }
};

const updateGameResults = async (req, res) => {
  try {
    const { gameId } = req.params;

    const { winningTeam, losingTeam, gameStatus } = req.body;

    // Validation
    if (!gameId || typeof gameId !== "string") {
      return res.status(400).json({ message: "Invalid or missing game ID" });
    }
    if (!winningTeam || typeof winningTeam !== "object") {
      return res
        .status(400)
        .json({ message: "Invalid or missing winning team" });
    }
    if (!losingTeam || typeof losingTeam !== "object") {
      return res
        .status(400)
        .json({ message: "Invalid or missing losing team" });
    }
    if (gameStatus === undefined) {
      return res.status(400).json({ message: "Missing status" });
    }

    if (typeof gameStatus !== "boolean") {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Check if the user is an admin
    const user = await Auth.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the game and update its results
    const game = await Game.findByIdAndUpdate(
      gameId,
      { winningTeam, losingTeam, gameStatus },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({
      message: "Game results updated successfully",
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating game results",
      error: error.message,
    });
  }
};

const updateBetStatus = async (req, res) => {
  try {
    const { betId } = req.query;
    const { betStatus } = req.body;

    // Validation
    if (!betId || typeof betId !== "string") {
      return res.status(400).json({ message: "Invalid or missing bet ID" });
    }

    if (!betStatus || typeof betStatus !== "string") {
      return res.status(400).json({ message: "Invalid or missing bet ID" });
    }

    // Check if the user is an admin
    const user = await Auth.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the bet and update its status
    const bet = await Bet.findByIdAndUpdate(
      betId,
      { betStatus },
      { new: true }
    );

    if (!bet) {
      return res.status(404).json({ message: "bet not found" });
    }

    res.status(200).json({
      message: "Bet Status updated successfully",
      bet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating game results",
      error: error.message,
    });
  }
};

const createBet = async (req, res) => {
  try {
    const { gameId, betAmount, betType, betOnTeam } = req.body;

    // Validation
    if (!gameId || typeof gameId !== "string") {
      return res.status(400).json({ message: "Invalid or missing game ID" });
    }
    if (!betAmount || typeof betAmount !== "number") {
      return res.status(400).json({ message: "Invalid or missing bet amount" });
    }
    if (!betType || typeof betType !== "string") {
      return res.status(400).json({ message: "Invalid or missing bet type" });
    }

    // Check if the game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (game.gameStatus === false) {
      return res.status(400).json({ message: "Game is already over" });
    }

    // Check if the user has enough balance in their wallet
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet || wallet.walletBalance < betAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create a new bet
    const newBet = new Bet({
      userId: req.user.id,
      gameId,
      betAmount,
      betType,
      betOnTeam,
      odds: game.odds,
      potentialWinnings: betAmount * game.odds,
    });

    await newBet.save();

    // Deduct the bet amount from the user's wallet
    wallet.walletBalance -= betAmount;
    await wallet.save();

    res.status(201).json({
      message: "Bet created successfully",
      newBet,
      remainingBalance: wallet.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating bet",
      error: error.message,
    });
  }
};

// Get all bets
const getAllBets = async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.user.id }).populate("gameId");
    res.status(200).json({ message: "Bets", bets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bets", error: error.message });
  }
};

// Get a specific bet
const getBetById = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.betId).populate("gameId");
    if (!bet) {
      return res.status(404).json({ message: "Bet not found" });
    }
    res.status(200).json({ message: "Bet details", bet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bet details", error: error.message });
  }
};

//User view bet results
const viewBetResults = async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.user.id }).populate("gameId");
    const results = bets.map((bet) => ({
      game: bet.gameId,
      betAmount: bet.betAmount,
      potentialWinnings: bet.potentialWinnings,
      status: bet.status,
    }));
    res.status(200).json({ message: "Bet results", results });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bet results", error: error.message });
  }
};

// User deposit money into wallet
const depositMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validation
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid or missing amount" });
    }

    // Find the user's wallet
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Deposit the amount into the wallet
    wallet.walletBalance += amount;
    await wallet.save();

    res.status(200).json({
      message: "Deposit successful",
      newBalance: wallet.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error depositing money",
      error: error.message,
    });
  }
};

// Calculate payouts and update wallets
const calculatePayouts = async (req, res) => {
  try {
    const { gameId } = req.body;

    // Validation
    if (!gameId || typeof gameId !== "string") {
      return res.status(400).json({ message: "Invalid or missing game ID" });
    }

    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Find all bets for the game
    const bets = await Bet.find({ gameId }).populate("userId");
    if (game.gameStatus === true) {
      return res.status(400).json({ message: "Game is still ongoing" });
    }

    // Calculate payouts
    for (const bet of bets) {
      if (
        bet.betType &&
        bet.betType.toLowerCase() === "win" &&
        bet.betOnTeam &&
        game.winningTeam &&
        game.winningTeam.team &&
        bet.betOnTeam.toLowerCase() === game.winningTeam.team.toLowerCase()
      ) {
        const payout = bet.potentialWinnings;
        const wallet = await Wallet.findOne({
          userId: bet.userId._id || bet.userId,
        });
        if (wallet) {
          wallet.walletBalance += payout;
          await wallet.save();
          bet.status = "won";
        } else {
          // Optionally log or handle missing wallet
          bet.status = "won";
        }
      } else {
        bet.status = "lost";
      }
      await bet.save();
    }

    const payoutResults = bets.map((bet) => ({
      betId: bet._id,
      userId: bet.userId._id,
      betType: bet.betType,
      status: bet.status,
      payout: bet.status === "won" ? bet.potentialWinnings : 0,
      potentialWinnings: bet.potentialWinnings,
    }));

    res.status(200).json({
      message: "Payouts calculated successfully",
      payouts: payoutResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating payouts",
      error: error.message,
    });
  }
};

// Combined endpoint for viewing bet history and results
const myBets = async (req, res) => {
  try {
    const { summary } = req.query; // e.g., /my-bets?summary=true

    const bets = await Bet.find({ userId: req.user.id }).populate("gameId");

    if (summary === "true") {
      // Return summarized results
      const results = bets.map((bet) => ({
        game: bet.gameId,
        betAmount: bet.betAmount,
        potentialWinnings: bet.potentialWinnings,
        status: bet.status,
      }));
      return res.status(200).json({ message: "Bet results", results });
    } else {
      // Return full bet history
      return res.status(200).json({ message: "Bet history", bets });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bets",
      error: error.message,
    });
  }
};

const aiChat = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // or any other model listed on OpenRouter
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "AI error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await Auth.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const getUserNotifications = async (req, res) => {
  // Placeholder: implement notification logic
  res.json({ notifications: [] });
};

const getLeaderboard = async (req, res) => {
  // Placeholder: implement leaderboard logic
  res.json({ leaderboard: [] });
};

const referFriend = async (req, res) => {
  // Placeholder: implement referral logic
  res.json({ message: "Referral sent!" });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ message: "Admin only" });
};
const getAllUsersAdmin = async (req, res) => {
  const users = await Auth.find();
  res.json({ users });
};

const sendSupportMessage = async (req, res) => {
  // Placeholder: implement support logic
  res.json({ message: "Support message sent!" });
};

const getTransactions = async (req, res) => {
  // Placeholder: implement transaction logic
  res.json({ transactions: [] });
};

// Paystack integration

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const paystackAxios = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// Initialize Paystack transaction
const initializePaystackPayment = async (req, res) => {
  try {
    const { amount, email } = req.body;
    if (!amount || !email) {
      return res.status(400).json({ message: "Amount and email are required" });
    }
    const response = await paystackAxios.post("/transaction/initialize", {
      amount: amount * 100, // Paystack expects amount in kobo
      email,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Paystack init error",
      error: error.response?.data || error.message,
    });
  }
};

// Verify Paystack transaction
const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ message: "Reference is required" });
    }
    const response = await paystackAxios.get(
      `/transaction/verify/${reference}`
    );
    if (response.data.status === false) {
      return res.status(400).json({ message: "Transaction not found" });
    }
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Paystack verify error",
      error: error.response?.data || error.message,
    });
  }
};


// const getLiveMatches = async (req, res) => {
//   try {
//     const API_KEY = process.env.ALLSPORTS_API_KEY; // Store your key in .env
//     const url = `https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${API_KEY}`;
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch live matches", error: error.message });
//   }
// };

// live matches endpoints





module.exports = {
  handleUserSignUp,
  getAllUsers,
  handleUserLogin,
  handleForgotPassword,
  handleResetPassword,
  getAllWallets,
  walletsByWalletId,
  myWallet,
  createGame,
  getAllGames,
  updateGameResults,
  updateBetStatus,
  createBet,
  getAllBets,
  getBetById,
  viewBetResults,
  depositMoney,
  calculatePayouts,
  myBets,
  aiChat,
  updateUserProfile,
  getUserNotifications,
  getLeaderboard,
  referFriend,
  isAdmin,
  getAllUsersAdmin,
  sendSupportMessage,
  getTransactions,
  initializePaystackPayment,
  verifyPaystackPayment,

};
