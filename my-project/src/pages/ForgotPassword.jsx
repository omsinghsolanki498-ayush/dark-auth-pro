import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // SEND OTP
  const sendOTP = async () => {

    try {

      const res = await axios.post(
        "http://localhost:3002/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response?.data?.message || "Something went wrong");

    }
  };

  // RESET PASSWORD
  const resetPassword = async () => {

    try {

      const res = await axios.post(
        "http://localhost:3002/api/auth/reset-password",
        {
          email,
          otp,
          newpassword: newPassword,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Something went wrong");

    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">

      {/* Main Section */}
      <div className="container flex justify-center items-center flex-1">

        <div className="form">

          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Forgot Password
          </h1>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg
            active:scale-95 transition duration-200"
            onClick={sendOTP}
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="bg-green-700 hover:bg-green-600 text-white rounded-lg
            active:scale-95 transition duration-200"
            onClick={resetPassword}
          >
            Reset Password
          </button>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 text-center bg-[#0d0d0d]">

        <h2 className="text-lg font-semibold text-white tracking-wide">
          Dark Auth Pro
        </h2>

        <p className="text-gray-400 text-sm mt-2 px-4">
          Password recovery secured with OTP verification.
          Protecting accounts with trusted authentication and secure access.
        </p>

        <p className="text-gray-600 text-xs mt-4">
          © 2026 Dark Auth Pro • Secure Password Recovery System
        </p>

      </footer>

    </div>
  );
};

export default ForgotPassword;