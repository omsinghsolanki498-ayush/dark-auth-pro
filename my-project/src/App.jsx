import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./Component/ProtectedRoute";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route
          path="/"
          element={<Register />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot"
          element={<ForgotPassword />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;