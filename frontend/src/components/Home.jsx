import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-white flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow p-8 bg-gray-850 shadow-inner">
        <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white">
          Welcome to <span className="text-blue-300">11millioncraft!</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-300">
          Your one-stop solution for corporate gifting needs.
        </p>
      </div>
    </div>
  );
}

export default Home;
