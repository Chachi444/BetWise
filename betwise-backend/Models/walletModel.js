const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    walletBalance: {
      type: Number,
      default: 0,
      required: true,
    },
    currency: {
      type: String,
      default: "NGN",
    },

    status: {
      type: String,
      default: "active",
    },
    

    verified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
  
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
