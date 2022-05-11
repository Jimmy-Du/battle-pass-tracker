import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='brand-title'>
        Battle Pass Tracker
      </div>
      <div className='navbar-links'>
        <ul>
          <li><a href='/'>Home</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar