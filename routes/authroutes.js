const express = require("express");

const router = express.Router();

const protectedRoutes = require("../Dashboard/ProtectedRoutes");

const { register, login, sendOTP, resetPassword, } = require("../controllers/authcontroller");

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", sendOTP);

router.post("/reset-password", resetPassword);

router.use("/dashboard", protectedRoutes);

module.exports = router;