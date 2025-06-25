// const express = require("express")
// const router = express.Router();


// const authRoutes = require("./authRoutes")



// const routes = [
//     authRoutes
// ]


// module.exports = router

const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

// Mount all auth routes at the root path
router.use("/", authRoutes);

module.exports = router;