const express = require("express");
const authRouter = require("./auth.router");
const { verificationLimiters } = require("../utils/rateLimit");

const router = express.Router();

router.use("/auth", verificationLimiters, authRouter);

module.exports = router;
