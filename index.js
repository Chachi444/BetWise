const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./authModel");
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Wallet = require("./walletModel");
const Bet = require("./betModel");
const Game = require("./gameModel");
const app = express();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.use(express.json());

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my Server" });
});

app.post("/sign-up", async (req, res) => {
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

    // Check if user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if username already exists
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
      message: "Error connecting to MongoDB",
      error: error.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Auth.find(); //.select("-password");
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  const user = await Auth.findOne({ username }); //.select("-password");

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
    expiresIn: "10m",
  });

  const refresh_token = jwt.sign({ id: user?._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  res.status(200).json({
    message: "Login successful",
    access_token, //accessToken
    user: {
      email: user?.email,
      userName: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      state: user?.state,
    },

    refresh_token, //refreshToken
  });
});

app.get("/wallets", async (req, res) => {
  try {
    const wallets = await Wallet.find(); //.select("-password");
    res.status(200).json({ message: "Wallets", wallets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

//Create games with odds
app.post("/create-games", authMiddleware, async (req, res) => {
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
});

app.get("/games", async (req, res) => {
  try {
    const games = await Game.find(); //.select("-password");
    res.status(200).json({ message: "Games", games });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching games", error: error.message });
  }
});
