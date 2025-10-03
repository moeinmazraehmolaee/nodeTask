const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit"); 

// --- IP limit ---
const ipLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 20, 
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again in 1 hour."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- user name limiter ---
const userNameLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3, 
  keyGenerator: (req) => req.body.username || ipKeyGenerator(req),
  message: {
    success: false,
    message: "Too many verification code requests for this email. Try again in 1 hour."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationLimiters = [ipLimiter, userNameLimiter];

module.exports = { ipLimiter, userNameLimiter, verificationLimiters };
