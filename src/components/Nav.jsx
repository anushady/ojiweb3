import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <div className='NavContainer'>
    <div className='nav'>
        <div className='logo'>
            <h1>OJI LABS.</h1>
        </div>
        <div className='menu'>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Contact</a></li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Nav