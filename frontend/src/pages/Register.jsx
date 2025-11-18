import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [type, setType] = useState("buyer"); // buyer | seller
  const [form, setForm] = useState({
    name: "",
    email: "",
    company_name: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/register", {
    role: type,
    name: form.name,
    email:form.email,
    company_name: type === "seller" ? form.company_name : null,
    password: form.password,
  })
    .then(res => {
      console.log("REGISTERED:", res.data);
      setSuccess(true);
      setForm({ name: "", email: "", company_name: "", password: "" });
    })
    .catch(err => {
      console.log(err.response?.data || err);
      alert("Registration failed");
    });


  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-orange-200">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Create an Account
        </h2>

        {/* Switcher */}
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

        {/* Success Message */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-100 text-green-700 p-3 rounded-xl flex justify-between items-center"
                    >
                        <span>User created successfully!</span>
                        <button onClick={() => setSuccess(false)}>✖</button>
                    </motion.div>
                )}
            </AnimatePresence>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name field */}
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

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

          {/* Seller-only field */}
          {type === "seller" && (
            <div>
              <label className="block font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                required
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          {/* Password field */}
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Register as {type === "buyer" ? "Buyer" : "Seller"}
          </button>
        </form>

              <p className="text-center text-gray-600 text-sm">
                  Already registered? <Link to="/login" className="text-blue-600">Login</Link>
              </p>
      </div>
    </div>
  );
}
