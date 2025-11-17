import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; 

export default function Login() {
  const [type, setType] = useState("buyer"); // buyer | seller
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      const user = res.data.user;

      // ⭐ Role-based redirect
      if (user.role === "buyer") {
        navigate("/buyer/home");
      } else if (user.role === "seller") {
        navigate("/seller/home");
      } else {
        setError("Unknown role.");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);

  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-orange-200">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Login to Healios
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex mb-6">
          <button
            onClick={() => setType("buyer")}
            className={`flex-1 py-2 font-semibold border rounded-l-lg ${
              type === "buyer"
                ? "bg-orange-500 text-white border-orange-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            Buyer
          </button>

          <button
            onClick={() => setType("seller")}
            className={`flex-1 py-2 font-semibold border rounded-r-lg ${
              type === "seller"
                ? "bg-orange-500 text-white border-orange-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email field */}
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
           {loading ? "Logging in.." : "Login as " +(type === "buyer" ? "Buyer" : "Seller")}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
                  Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
              </p>
      </div>
    </div>
  );
}
