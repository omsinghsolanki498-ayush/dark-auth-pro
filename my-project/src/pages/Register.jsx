import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3002/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Register Failed");
    }
  };

  return (
  <>
    <div className="min-h-screen bg-black flex flex-col justify-between">

      {/* Main Section */}
      <div className="container flex justify-center items-center flex-1">

        <form className="form" onSubmit={handleSubmit}>

          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Register
          </h1>

          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-lg 
            hover:bg-blue-600 active:scale-95 transition duration-200"
          >
            Register
          </button>

          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-400"
              >
                Login
              </Link>
            </p>
          </div>

        </form>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 text-center bg-[#0d0d0d]">

        <h2 className="text-lg font-semibold text-white tracking-wide">
          Dark Auth Pro
        </h2>

        <p className="text-gray-400 text-sm mt-2 px-4">
          Secure authentication built for modern applications. 
          Protecting user identity with simplicity, speed, and trust.
        </p>

        <p className="text-gray-600 text-xs mt-4">
          © 2026 Dark Auth Pro • Authentication System
        </p>

      </footer>

    </div>
  </>
  );
};

export default Register;


