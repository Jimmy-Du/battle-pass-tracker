import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='brand-title'>
        Battle Pass Tracker
      </div>
      <div className='navbar-links'>
        <ul>
          <li><Link to='/'>Home</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar