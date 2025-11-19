import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint
      await api.post("/logout");

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded"
    >
      Logout
    </button>
  );
}
