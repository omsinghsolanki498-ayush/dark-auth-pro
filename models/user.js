const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {

        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    otp: String,
    otpExpire: Date,

},
    { timestamps: true },
)

module.exports = mongoose.model("user", userSchema);