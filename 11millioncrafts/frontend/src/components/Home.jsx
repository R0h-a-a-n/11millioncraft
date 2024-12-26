import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };
  return (
    <>
    <div className="border border-purple-500 rounded-lg p-10 bg-gradient-to-r from-purple-300 to-transparent">
      <h2 className='mb-3 text-[10vh] animate-slidein [--slidein-delay:900ms]'>Welcome to 11millioncraft!</h2>
      <p className='text-black text-[9vh] animate-slidein [--slidein-delay:500ms]'>Your one-stop solution for corporate gifting needs.</p>
    </div>
    </>
    
    
  );
}

export default Home;

