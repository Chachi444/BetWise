const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    odds: {
      type: Number,
      required: true,
    },
    potentialWinnings: {
      type: Number,
      required: true,
    },
    betStatus: {
      type: String,
      default: "pending",
    },
  },

  { timestamps: true }
);


const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;