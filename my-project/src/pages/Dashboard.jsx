import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

       try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);

      } catch (error) {

        console.log(error.response?.data);

        navigate("/login");
      }
    };

    fetchDashboard();

  }, [navigate]);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">

      {/* Navbar */}
      <nav className="w-full border-b h-13  border-gray-800 bg-[#0d0d0d] px-8 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-bold tracking-widest shadow shadow-blue-500 text-white">
          DARK AUTH
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 w-[15vw] h-9 bg-red-600 hover:bg-red-700 
          text-white rounded-lg transition duration-200 
          active:scale-95 shadow-lg shadow-red-600/20"
        >
          Logout
        </button>

      </nav>

      {/* Main Dashboard */}
      <div className="flex flex-1 h- justify-center items-center px-4">

        <div className="w-full h-[20vh]  max-w-2xl shadow-sm shadow-red-800 text-center">

          <h2 className="text-4xl text-blue-800 mt-3 tracking-wide">
            DARK AUTH PRO
          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            A secure authentication dashboard built for modern web applications.
            Fast access, protected sessions, and trusted user management —
            all in one powerful system.
          </p>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 text-center bg-[#0d0d0d]">

        <h2 className="text-lg font-semibold text-white tracking-wide">
          DARK AUTH PRO
        </h2>

        <p className="text-gray-400 text-sm mt-2 px-4">
          Security is not just a feature — it’s the foundation of trust.
        </p>

        <p className="text-gray-600 text-xs mt-4">
          © 2026 DARK AUTH PRO • Secure Authentication Dashboard
        </p>

      </footer>

    </div>
  );
};

export default Dashboard;