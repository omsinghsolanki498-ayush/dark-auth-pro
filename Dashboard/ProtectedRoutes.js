const express = require("express");

const router = express.Router();

const middleware = require("../middleware/authmiddleware");

router.get("/", middleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Dashboard",
    user: req.user,
  });
});

module.exports = router;