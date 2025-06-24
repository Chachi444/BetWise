const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // <-- Make sure this is called right after requiring dotenv
const Auth = require("./Models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Wallet = require("./Models/walletModel");
const Bet = require("./Models/betModel");
const Game = require("./Models/gameModel");
const routes = require("./Routes");


 const nodemailer = require("nodemailer");
 const { sendForgotPasswordEmail, validEmail } = require("./sendMail");
// const { getAllUsers } = require("./Controllers");



const app = express();


app.use(express.json());
app.use(cors());



const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Betwise Sports Betting Platform. Your ultimate sports betting platform." });
});


app.use(routes);
