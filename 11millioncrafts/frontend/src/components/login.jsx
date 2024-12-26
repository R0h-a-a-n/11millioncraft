import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password, role });
      setMessage(response.data.message);
      setError(false);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid email, password, or role.');
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400/20 to-blue-500/20 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 m-4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          />
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          
          <button
            type="submit"
            className="w-full px-4 py-3 text-white font-medium bg-purple-200 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Login
          </button>
          
          {message && (
            <p className={`p-4 rounded-lg ${
              error 
                ? 'bg-red-100/80 text-red-800 border border-red-200' 
                : 'bg-green-100/80 text-green-800 border border-green-200'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;