import React, { useState } from 'react'
import MyAccount from '../MyAccountComponents/MyAccount'
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import MyAccountIcon from '../Icons/MyAccountIcon';
import SignInIcon from '../Icons/SignInIcon';
import axios from 'axios';
import './Styles/UpNavigation.css'


export default function UpNavigation({ hide }) {
  
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState('close');
  
  const isAuthorizate = useSelector(state=>state.isAuthorizate);
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const dispatch = useDispatch();
  
  const getCountOfOrder = () => {
    axios.post( 'https://api.native-flora.tk/Cart/Count', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => dispatch({type: 'SET_COUNT_OF_ORDERS', payload: res.data.data}))
  }

  return (
    <>
      <div id='upNav' className='upNavContainer'>
        {
          isAuthorizate
            ? <MyAccountIcon 
                onClick={()=>{
                  myAccountIsOpen
                    ? dispatch({type: 'CLOSE_MY_ACCOUNT'}) 
                      : dispatch({type: 'OPEN_MY_ACCOUNT'}) 
                  refreshFunction(dispatch, getCountOfOrder)
                }} 
              />
              : <SignInIcon />
        }
        <div className='NavLinks'>
          <Link activeClass="active" 
                to={`${hide? 'hideNavBarMainLink' : 'main'}`} 
                spy={true} 
                smooth={true} 
                offset={-90} 
                duration={500} 
                isDynamic={true} 
                onClick={()=>refreshFunction(dispatch)}
                className={`NavLink`}>ГЛАВНАЯ</Link>
          <Link activeClass="active" 
                to="catalogOfWorks" 
                spy={true} 
                smooth={true} 
                offset={-60} 
                duration={500} 
                onClick={()=> refreshFunction(dispatch)}
                className={`NavLink ${hide}`}>КАТАЛОГ</Link>
          <Link activeClass="active" 
                to="timingAndDelivery" 
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={()=>refreshFunction(dispatch)}
                className={`NavLink ${hide}`}>СРОКИ И ДОСТАВКА</Link>
          <Link activeClass="active" 
                to="aboutCashpo" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={500} 
                className={`NavLink ${hide}`}>О КАШПО</Link>
          <Link activeClass="active" 
                to="contactWithUs" 
                spy={true} 
                smooth={true} 
                offset={-65} 
                duration={500} 
                className={`NavLink`}>КОНТАКТЫ</Link>
        </div>
        <NavLink to='/' className='header-LOGO'>
          <img 
            width={90} 
            height={70} 
            src={require('../Photos/Logo.png')}
            alt='LOGO'
            onClick={()=>refreshFunction(dispatch)}/>
        </NavLink>
        <div className='hamburger' 
             onClick={()=>{
              (openHamburgerMenu === '')
                ? setOpenHamburgerMenu('close')
                  : setOpenHamburgerMenu('')

              if(localStorage.getItem('accessToken')){
                refreshFunction(dispatch);
              }
          }}>☰</div>
        { myAccountIsOpen && <MyAccount /> }
      </div>
      <div className={`hamburgerNavLinks ${openHamburgerMenu}`} >
        <Link activeClass="active" 
              to={`${hide? 'hideNavBarMainLink' : 'main'}`}
              spy={true} 
              smooth={true} 
              offset={-230} 
              duration={500} 
              isDynamic={true} 
              onClick={()=>refreshFunction(dispatch)}
              className={`NavLink `}>ГЛАВНАЯ</Link>
        <Link activeClass="active" 
              to="catalogOfWorks" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500}
              onClick={()=>refreshFunction(dispatch)}
              className={`NavLink ${hide}`}>КАТАЛОГ</Link>
        <Link activeClass="active" 
              to="timingAndDelivery" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500}
              onClick={()=>refreshFunction(dispatch)}
              className={`NavLink ${hide}`}>СРОКИ И ДОСТАКА</Link>
        <Link activeClass="active" 
              to="aboutCashpo" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500} 
              onClick={()=>refreshFunction(dispatch)}
              className={`NavLink ${hide}`}>О КАШПО</Link>
        <Link activeClass="active" 
              to="contactWithUs" 
              spy={true} 
              smooth={true} 
              offset={-180} 
              duration={500}
              onClick={()=>refreshFunction(dispatch)}
              className={`NavLink `}>КОНТАКТЫ</Link>
      </div>
    </>
  )
}
