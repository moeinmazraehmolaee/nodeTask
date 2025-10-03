const jwt = require("jsonwebtoken");
const User = require('../models/User.model')

// Middleware for regular users
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please log in first" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET 
    );

    const user = await User.findById(decoded.userId);
    
    req.user = user

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};



module.exports = { auth };
