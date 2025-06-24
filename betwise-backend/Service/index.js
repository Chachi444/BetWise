const Auth = require("../Models/authModel");
const Bet = require("../Models/betModel");
const Game = require("../Models/gameModel");
const Wallet = require("../Models/walletModel");


const findUsers =  async () => {
    const allUser = await Auth.find()
    
    return allUser;
}

const findWallets =  async () => {
    const allWallet = await Wallet.find()
    
    return allWallet;
}

const findBets =  async () => {
    const allBets = await Bet.find()
    
    return allBets;
}


const findGames =  async () => {
    const allGames = await Game.find()
    
    return allGames;
}







module.exports = {
    findUsers,
    findWallets,
    findBets,
    findGames
    
};