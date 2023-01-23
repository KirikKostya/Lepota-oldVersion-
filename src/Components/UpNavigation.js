import React, { useState } from 'react'
import { refreshFunction } from '../App'
import './Styles/UpNavigation.css'
import MyAccount from './MyAccount'

export default function UpNavigation({ isAuthorizate, setIsAuthorizate}) {

  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
    <div id='UpNav' className='UpNavContainer'>
        <div>
              <svg width="40" 
                   height="40" 
                   viewBox="0 0 16 16" 
                   onClick={()=>{
                                  (isOpen) ? setIsOpen(false) : setIsOpen(true);
                                  if(localStorage.getItem('accessToken')){
                                    refreshFunction();
                                  }
                                }}> 
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                <path fillRule="evenodd" d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
              </svg>
        </div>
        
        <div className='NavLinks'>
            <p className='NavLink'>ГЛАВНАЯ</p>
            <p className='NavLink' to='/TypeCatalog'>КАТАЛОГ</p>
            <p className='NavLink'>СРОКИ И ДОСТАКА</p>
            <p className='NavLink'>О КАШПО</p>
            <p className='NavLink'>КОНТАКТЫ</p>
        </div>
        
        <img src={require('../Photos/LOGO.png')} className='Logo' />

        <div className='Hamburger' 
             onClick={()=>{
              if(openMenu){
                setOpenMenu(false)
              } else { 
                setOpenMenu(true)
              }
              if(localStorage.getItem('accessToken')){
              refreshFunction();
              }
          }}>☰</div>
        {
          (!isOpen)
            ?<></>
             :<MyAccount isAuthorizate={isAuthorizate} setIsAuthorizate = {setIsAuthorizate}/>
        }

    </div>
    <div className={`HamburgerNavLinks ${openMenu}`} >
    <p className='NavLink' >ГЛАВНАЯ</p>
            <p className='NavLink'>КАТАЛОГ</p>
            <p className='NavLink'>СРОКИ И ДОСТАКА</p>
            <p className='NavLink'>О КАШПО</p>
            <p className='NavLink'>КОНТАКТЫ</p>
    </div>
    </>
  )
}
