import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://one1millioncraft-backend.onrender.com/adduser", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
    navigate("/superadmin");
  };

  return (
    <div className="shadow-lg">
      <form onSubmit={handleSubmit} className="bg-black/20">
        <label htmlFor="name" className="text-2xl">
          Username
        </label>
        <input
          type="text"
          id="name"
          className="w-[50vh] rounded-lg p-4 mb-[5vh]"
          placeholder="Enter name"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <label htmlFor="mail" className="text-2xl">
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
        <label htmlFor="password" className="text-2xl">
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
          Create
        </button>
      </form>
    </div>
  );
};

export default Signup;
