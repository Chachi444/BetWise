const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username : {
        type: String,
        required: true,
        unique: true,   
    },

    firstName: {
        type: String,   
    },
    lastName: {
        type: String,   
    },

    password: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },


    

}, { timestamps: true });



const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;



