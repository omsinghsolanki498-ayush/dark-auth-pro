const userModel = require("../models/user");  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/sendemail");

// REGISTER

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      message: "Register Success",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const existUser = await userModel.findOne({ email });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Success",
      token,

      user: {
        name: existUser.name,
        email: existUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// SEND OTP

// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found",
//       });
//     }

//     const otp = otpGenerator.generate(6, {
//       digits: true,
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     user.otp = otp;

//     user.otpExpire = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await sendEmail(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "OTP Sent Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };






exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    // SAFE EMAIL SEND (IMPORTANT FIX)
    try {
      await sendEmail(email, otp);
    } catch (mailError) {
      console.log("Email error:", mailError.message);
      return res.status(500).json({
        success: false,
        message: "OTP generated but email failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// RESET PASSWORD

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    const hash = await bcrypt.hash(newpassword, 10);

    user.password = hash;

    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};