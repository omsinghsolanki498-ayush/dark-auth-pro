const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {

        // Remove token cookie from browser
    res.clearCookie("token",{
        httpOnly:true,
    });

    res.json({
        success: true,
        message: "Logout Successfully",
    });

});

module.exports = router;