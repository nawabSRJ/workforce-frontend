import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Hardcoded Admin Data (Passwords are Hashed)
  const admins = {
    Vaishnavi: bcrypt.hashSync("Vaishnavi@123", 10),
    Srijan: bcrypt.hashSync("Srijan@456", 10),
  };

  useEffect(() => {
    const blocked = localStorage.getItem("isBlocked");
    if (blocked === "true") setIsBlocked(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (isBlocked) {
      setError("Too many failed attempts. Try again later!");
      return;
    }

    if (admins[username] && bcrypt.compareSync(password, admins[username])) {
      localStorage.setItem("isAuthenticated", "true");
      alert(`Login Successful! Welcome, ${username}`);

      // Navigate to Admin Dashboard
      navigate("/admin-dash");
    } else {
      let newAttempts = attempts + 1;
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setError("Too many failed attempts. Access blocked!");
        localStorage.setItem("isBlocked", "true");
      } else {
        setAttempts(newAttempts);
        setError("Invalid credentials. Try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isBlocked}
            className={`w-full py-2 text-white font-semibold rounded-md ${
              isBlocked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;