import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Local Validation
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8088/api/auth/login", {
        email,
        password,
      });

      const { token, email: name, role } = response.data;

      if (role === "INVALID") {
        setError("Login failed: Invalid email or password.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      onClose();

      if (role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else if (role === "HR") {
        navigate("/hr/dashboard");
      } else {
        setError("Unknown role. Cannot redirect.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-lg w-96 p-6 relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-white hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-white">Login</h2>

      <p className="text-white"> If your login credientals are employee it land into employee portal ,if your login credientals are hr 
        it will land into hr portal
      </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-black border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800 text-black border-gray-600"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-primary text-white hover:opacity-90">
            {activeTab === "employee" ? "Employee Login" : "HR Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
