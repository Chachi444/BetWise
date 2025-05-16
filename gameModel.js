const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    sportName: {
      type: String,
     default: "",
    },

    gameType: {
      type: String,
    default: "",
    },

    teams: {
      type: [String],
      required: true,
      validate: [arr => arr.length === 2, "There must be exactly two teams"],
    },

    odds: {
      type: Number,
      required: true,
    },
    gameStatus: {
      type: Boolean,
      default: true,
    },

    results: {
      type: [Number],
      default: [0, 0],
    },

    gameDate: {
      type: Date,
      required: true,
    },

    gameTime: {
      type: Date,
      required: true,
    },

    gameDuration: {
      type: String,
      default: "",
    },
  },
  
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

