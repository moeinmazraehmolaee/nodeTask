const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId, role) => {
  const ONE_HOUR = 60 * 60 * 1000; 

  const token = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } 
  );

 
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + ONE_HOUR), 
    sameSite: "strict",
    path: "/",
  });

};

module.exports = { generateTokenAndSetCookie };
