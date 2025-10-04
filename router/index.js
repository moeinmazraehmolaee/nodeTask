const express = require("express");

const { verificationLimiters } = require("../utils/rateLimit");
const { auth } = require("../middlewares/auth");

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const productRouter = require("./product.routes");

const router = express.Router();

router.use("/auth", verificationLimiters, authRouter);
router.use("/user", auth, userRouter);
router.use("/products", auth,productRouter);

module.exports = router;
