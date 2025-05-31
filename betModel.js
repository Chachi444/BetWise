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
    betType: {
      type: String,
      required: true,
    },
    betOnTeam: { // <-- Add this field to record which team the user is betting on
      type: String,
      required: true,
    },
    potentialWinnings: {
      type: Number,
      default: 0,
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