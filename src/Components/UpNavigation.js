import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/UpNavigation.css'

export default function UpNavigation() {
  return (
    <div className='UpNavContainer'>
        <img src={require('../Photos/LOGO.png')} className='Logo' />
        <div className='NavLinks'>
            {/* <NavLink></NavLink>
            <NavLink></NavLink>
            <NavLink></NavLink> */}

            <p>ГЛАВНАЯ</p>
            <p>КАТАЛОГ</p>
            <p>СРОКИ И ДОСТАКА</p>
            <p>О КАШПО</p>
            <p>КОНТАКТЫ</p>
        </div>
        <div>
              <svg width="40" height="40" viewBox="0 0 16 16"> 
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                <path fillRule="evenodd" d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
              </svg>
        </div>
    </div>
  )
}
