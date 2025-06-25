const mongoose = require("mongoose");

// const teamScoreSchema = new mongoose.Schema(
//   {
//     team: {
//       type: String,
//       required: true,
//     },
//     score: {
//       type: Number,
//       required: true,
//     },
//   },
//   { _id: false }
// );

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

    winningTeam: {
      type: Object,
      default: {}, // Use null for no winner yet
      validate: {

        validator: function (value) {
          // Allow null if the game is not finished yet
          if (!value) return true;
          return this.teams.includes(value.team);
        },
        message: "Winning team must be one of the teams in the game.",
      },
    },

    losingTeam: {
      type: Object,
      default: {}, // Use null for no loser yet
      validate: {
        validator: function (value) {
          // Allow null if the game is not finished yet
          if (!value) return true;
          return this.teams.includes(value.team);
        },
        message: "Losing team must be one of the teams in the game.",
      },
    },

    odds: {
      type: Number,
      required: true,
    },

    gameStatus: {
      type: Boolean,
      default: true, // true for ongoing, false for completed
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
      default: "",
    },

    gameDuration: {
      type: String,
      default: "",
    },

    adminId: {
    type: String,
    required: true,
  },

  }, { timestamps: true }
  
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;