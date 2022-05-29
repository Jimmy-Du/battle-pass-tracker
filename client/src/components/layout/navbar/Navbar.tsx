import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='brand-title'>
        Battle Pass Tracker
      </div>
      <div className='navbar-links'>
        <ul>
          <li>
            <NavLink 
              to='/' 
              className={({isActive}) => isActive ? 'active-link' : 'link'}>
                Home
            </NavLink>
            </li>
          <li>
            <NavLink 
              to='/select-games' 
              className={({isActive}) => isActive ? 'active-link' : 'link'}
            >
              Select Games
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar