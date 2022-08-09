import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  // Function:    toggleLinks()
  // Description: called upon when the user clicks the show links button on mobile devices
  //              and will display the navbar links
  // Parameters:  e: info about the event that invoked the function
  // Return:      N/A
  const toggleLinks = (e: any) => {
    const links = e.target.nextElementSibling
    links.classList.toggle('active')
  }



  return (
    <nav className='navbar'>
      <div className='brand-title'>
        Battle Pass Tracker
      </div>
      <span className='toggle-btn' onClick={(e) => toggleLinks(e)}>
        Menu
      </span>
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
              to='/events' 
              className={({isActive}) => isActive ? 'active-link' : 'link'}
            >
              Events
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