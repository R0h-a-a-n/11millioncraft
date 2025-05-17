import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import inventImage from "../assets/invent.jpg";
import inventimage from "../assets/sstock.jpg";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://one1millioncraft-backend.onrender.com/checkuser",
        form
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        if (decoded.issuperadmin) {
          navigate("/superadmin");
        } else {
          navigate("/products");
        }
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="shadow-lg">
      <div
        className="p-[100vh] bg-cover bg-center backdrop-blur-lg"
        style={{ backgroundImage: `url(${inventimage})` }}
      >
        <form onSubmit={handleSubmit} className="bg-black/50">
          <label htmlFor="mail" className="text-2xl text-white">
            Email
          </label>
          <input
            type="email"
            id="mail"
            placeholder="Enter email"
            className="w-[50vh] rounded-lg p-4 mb-[5vh]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label htmlFor="password" className="text-2xl text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-[50vh] rounded-lg p-4 mb-[5vh]"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-900 to-transparent"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/home")}
          className="px-20 mt-4 py-2 text-white rounded-lg bg-black text-gray-700 hover:bg-green-200 hover:text-black transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default Login;
