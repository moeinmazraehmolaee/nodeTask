const express = require("express");

const { verificationLimiters } = require("../utils/rateLimit");
const { auth } = require("../middlewares/auth");

const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const router = express.Router();

router.use("/auth", verificationLimiters, authRouter);
router.use("/user", auth, userRouter);

module.exports = router;
