import React from 'react';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page border border-black rounded-lg p-10">
     <p className='text-4xl text-black mb-4'>Welcome to 11MillionCraft</p>
      <div className="button-group">
        <button className='bg-purple-200 mr-2 p-2 rounded-lg hover:bg-purple-500' onClick={() => navigate('/signup')}>New User</button>
        <button className='bg-purple-200 p-2 rounded-lg hover:bg-purple-500' onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default LandingPage;
