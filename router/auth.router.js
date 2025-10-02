const express = require("express");
const { login, logout } = require("../controllers/auth.controller.js");
const validateLogin = require("../middlewares/validateLogin.js");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/logout", logout);

module.exports = router;
