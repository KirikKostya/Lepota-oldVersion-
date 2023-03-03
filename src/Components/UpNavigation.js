import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../App'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import MyAccount from './MyAccount'
import axios from 'axios';
import './Styles/UpNavigation.css'

export default function UpNavigation({ hide }) {

  const dispatch = useDispatch();
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState('close');

  const getCountOfOrdersInBasket = ()=>{
    axios.post( 'https://api.native-flora.tk/Cart/Count', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => dispatch({type: 'SET_COUNT_OF_ORDERS', payload: res.data.data}))
  }
  return (
    <>
      <div id='UpNav' className='UpNavContainer'>
        <div>
              <svg width="40" 
                   height="40" 
                   viewBox="0 0 16 16" 
                   onClick={()=>{
                                  myAccountIsOpen
                                    ? dispatch({type: 'CLOSE_MY_ACCOUNT'}) 
                                      : dispatch({type: 'OPEN_MY_ACCOUNT'}) 

                                      if(localStorage.getItem('accessToken')){
                                        refreshFunction();
                                        getCountOfOrdersInBasket();
                                      }
                                }}> 
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                <path fillRule="evenodd" 
                      d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
              </svg>
        </div>
        
        <div className='NavLinks'>
            <Link activeClass="active" 
                  to={`${hide? 'hideNavBarMainLink' : 'Main'}`} 
                  spy={true} 
                  smooth={true} 
                  offset={-90} 
                  duration={500} 
                  isDynamic={true} 
                  onClick={refreshFunction}
                  className={`NavLink`} >ГЛАВНАЯ</Link>
            <Link activeClass="active" 
                  to="CatalogOfWorks" 
                  spy={true} 
                  smooth={true} 
                  offset={-60} 
                  duration={500} 
                  onClick={refreshFunction}
                  className={`NavLink ${hide}`} >КАТАЛОГ</Link>
            <Link activeClass="active" 
                  to="TimingAndDelivery" 
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={refreshFunction}
                  className={`NavLink ${hide}`} >СРОКИ И ДОСТАВКА</Link>
            <Link activeClass="active" 
                  to="AboutCashpo" 
                  spy={true} 
                  smooth={true} 
                  offset={-100} 
                  duration={500} 
                  className={`NavLink ${hide}`} >О КАШПО</Link>
            <Link activeClass="active" 
                  to="ContactWithUs" 
                  spy={true} 
                  smooth={true} 
                  offset={-65} 
                  duration={500} 
                  className={`NavLink`} >КОНТАКТЫ</Link>
        </div>
        
        <NavLink to='/' className='header'>
          <h2>LEPOTA.BY</h2>
        </NavLink>
        
        <div className='Hamburger' 
             onClick={()=>{
              (openHamburgerMenu === '')
                ? setOpenHamburgerMenu('close')
                  :setOpenHamburgerMenu('')

              if(localStorage.getItem('accessToken')){
                refreshFunction();
              }

          }}>☰</div>
        {
          (myAccountIsOpen)
            ? <MyAccount />
             : <></>
        }

      </div>
      <div className={`HamburgerNavLinks ${openHamburgerMenu}`} >
            <Link activeClass="active" 
                  to={`${hide? 'hideNavBarMainLink' : 'Main'}`}
                  spy={true} 
                  smooth={true} 
                  offset={-230} 
                  duration={500} 
                  isDynamic={true} 
                  onClick={refreshFunction}
                  className={`NavLink `}>ГЛАВНАЯ</Link>
            <Link activeClass="active" 
                  to="CatalogOfWorks" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500}
                  onClick={refreshFunction}
                  className={`NavLink ${hide}`}>КАТАЛОГ</Link>
            <Link activeClass="active" 
                  to="TimingAndDelivery" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500}
                  onClick={refreshFunction}
                  className={`NavLink ${hide}`}>СРОКИ И ДОСТАКА</Link>
            <Link activeClass="active" 
                  to="AboutCashpo" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500} 
                  onClick={refreshFunction}
                  className={`NavLink ${hide}`}>О КАШПО</Link>
            <Link activeClass="active" 
                  to="ContactWithUs" 
                  spy={true} 
                  smooth={true} 
                  offset={-180} 
                  duration={500}
                  onClick={refreshFunction}
                  className={`NavLink `}>КОНТАКТЫ</Link>
      </div>
    </>
  )
}
