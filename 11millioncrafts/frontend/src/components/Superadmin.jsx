import React from 'react'
import { useNavigate } from 'react-router-dom'

const superadmin = () => {
    const navigate = useNavigate();
  return (
    <div>
      <p>supe</p>
      <button onClick={()=>{navigate('/signup')}} className='shadow-lg bg-green-400 rounded-lg p-4 hover:bg-sky-400'>Add Admin</button>
    </div>
  )
}

export default superadmin
