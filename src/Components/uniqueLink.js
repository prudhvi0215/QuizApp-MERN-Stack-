import React from 'react'

import { useNavigate } from 'react-router-dom'

const uniqueLink = () => {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  let link = JSON.parse(localStorage.getItem('uniqueLink'));

  return (
    <>
        <div className='adminNavbar'>
            <h1>Admin Portal</h1>
            <a onClick={handleLogout}>Logout</a>
        </div>
        <div className='uniqueLink'>
            <a href={"http://localhost:3000"} target="_blank">{link}</a>
        </div>
    </>
  )
}

export default uniqueLink