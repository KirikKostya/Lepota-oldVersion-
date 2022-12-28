import React, {useState} from 'react'
import '../Styles/UpNavigation.css'
import MyAccount from './MyAccount'
import { refreshFunction } from '../App'
import { BrowserRouter } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { NavLink } from 'react-router-dom'

export default function UpNavigation({isAuthorizate, setIsAuthorizate,setOpacity}) {

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
                                  // if(localStorage.getItem('accessToken')){
                                  //   // refreshFunction();
                                  // }
                                }}> 
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                <path fillRule="evenodd" d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
              </svg>
        </div>
        
        <div className='Hamburger' 
             onClick={()=>{
              if(openMenu){
                setOpenMenu(false)
              } else { 
                setOpenMenu(true)
              }
              // if(localStorage.getItem('accessToken')){
              // refreshFunction();
              // }}
          }}>☰</div>
        
        <div className='NavLinks'>
            <NavLink className='NavLink' to='/'><p>ГЛАВНАЯ</p></NavLink>
            <NavLink className='NavLink' to='/WorkCatalog'><p>КАТАЛОГ</p></NavLink>
            <NavLink className='NavLink' to='/TimingAndDelivery'><p>СРОКИ И ДОСТАКА</p></NavLink>
            <NavLink className='NavLink' to='/AboutKashpo'><p>О КАШПО</p></NavLink>
            <NavLink className='NavLink' to='/ContactWithUs'><p>КОНТАКТЫ</p></NavLink>
        </div>
        
        <img src={require('../Photos/LOGO.png')} className='Logo' />
        {
          (!isOpen)
            ?<></>
             :<MyAccount isAuthorizate={isAuthorizate} setIsAuthorizate = {setIsAuthorizate}/>
        }

    </div>
    <div className={`HamburgerNavLinks ${openMenu}`} >
            <NavLink className='NavLink' to='/'><p>ГЛАВНАЯ</p></NavLink>
            <NavLink className='NavLink' to='/WorkCatalog'><p>КАТАЛОГ</p></NavLink>
            <NavLink className='NavLink' to='/TimingAndDelivery'><p>СРОКИ И ДОСТАКА</p></NavLink>
            <NavLink className='NavLink' to='/AboutKashpo'><p>О КАШПО</p></NavLink>
            <NavLink className='NavLink' to='/ContactWithUs'><p>КОНТАКТЫ</p></NavLink>
    </div>
    </>
  )
}
