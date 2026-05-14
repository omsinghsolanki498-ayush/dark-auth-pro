// import axios from "axios";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:3002/api/auth/login",
//         formData
//       );
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");

//     } catch (error) {

//       console.log(error);

//       alert(error.response?.data?.message || "Login Failed");
//     }
//   };

//   return (
//     <div className="container">
//       <form className="form" onSubmit={handleSubmit}>
//         <h1>Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           onChange={handleChange}
//         />

//         <button className="px-4 py-2 bg-red-600 text-white rounded 
// active:translate-y-1 transition-transform duration-150 
// hover:bg-red-700">
//           Login
//         </button>

//         <div className="flex items-center justify-between mt-4 text-sm">

//           <Link
//             to="/"
//             className="text-red-500 hover:text-red-600 transition font-medium"
//           >
//             Don’t have an account? Register
//           </Link>

//           <Link
//             to="/forgot"
//             className="text-blue-600 hover:text-blue-700 transition font-medium"
//           >
//             Forgot Password?
//           </Link>

//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;



import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "http://localhost:3002/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">

      {/* Main Section */}
      <div className="container flex justify-center items-center flex-1">

        <form className="form" onSubmit={handleSubmit}>

          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Login
          </h1>

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
            className="px-4 py-2 bg-red-600 text-white rounded-lg
            active:scale-95 transition duration-200
            hover:bg-red-700"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex items-center justify-between mt-4 text-sm">

            <Link
              to="/"
              className="text-red-500 hover:text-red-400 transition font-medium"
            >
              Don’t have an account?
            </Link>

            <Link
              to="/forgot"
              className="text-blue-600 hover:text-blue-400 transition font-medium"
            >
              Forgot Password?
            </Link>

          </div>

        </form>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 text-center bg-[#0d0d0d]">

        <h2 className="text-lg font-semibold text-white tracking-wide">
          Dark Auth Pro
        </h2>

        <p className="text-gray-400 text-sm mt-2 px-4">
          Secure login experience designed for modern authentication systems.
          Fast, protected, and built with user trust in mind.
        </p>

        <p className="text-gray-600 text-xs mt-4">
          © 2026 Dark Auth Pro • Secure Authentication Platform
        </p>

      </footer>

    </div>
  );
};

export default Login;