import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import MyAccount from '../MyAccountComponents/MyAccount'
import axios from 'axios';
import './Styles/UpNavigation.css'


export default function UpNavigation({ hide }) {

const A = 'M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5     l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2     C7.7,232.5,0,240.1,0,249.6z'
const B = 'M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166     c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7     c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6     c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z'

  const dispatch = useDispatch();
  const isAuthorizate = useSelector(state=>state.isAuthorizate);
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState('close');
    
  //getting count of orders in basket
  const getCountOfOrdersInBasket = ()=>{
    axios.post( 'https://api.native-flora.tk/Cart/Count', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => dispatch({type: 'SET_COUNT_OF_ORDERS', payload: res.data.data}))
  }

  return (
    <>
      <div id='UpNav' className='UpNavContainer'>
        {
          isAuthorizate
          ? <div>
              <svg width="40" 
                   height="40" 
                   viewBox="0 0 16 16" 
                   onClick={()=>{
                                  myAccountIsOpen
                                    ? dispatch({type: 'CLOSE_MY_ACCOUNT'}) 
                                      : dispatch({type: 'OPEN_MY_ACCOUNT'}) 

                                  if(localStorage.getItem('accessToken')){
                                    refreshFunction(dispatch);
                                    getCountOfOrdersInBasket()
                                  }
                                }}> 
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                <path fillRule="evenodd" 
                      d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
              </svg>
            </div>
            :
              <NavLink 
                to={'/Registration'}
                onClick={()=> refreshFunction(dispatch)}>
                  <svg 
                    fill='black' 
                    width={33} 
                    height={33} 
                    viewBox='0 0 499.1 499.1'>
                      <path d={A}/>
                      <path d={B}/>
                  </svg>
              </NavLink>
        }
        <div className='NavLinks'>
            <Link activeClass="active" 
                  to={`${hide? 'hideNavBarMainLink' : 'Main'}`} 
                  spy={true} 
                  smooth={true} 
                  offset={-90} 
                  duration={500} 
                  isDynamic={true} 
                  onClick={()=>refreshFunction(dispatch)}
                  className={`NavLink`} >ГЛАВНАЯ</Link>
            <Link activeClass="active" 
                  to="CatalogOfWorks" 
                  spy={true} 
                  smooth={true} 
                  offset={-60} 
                  duration={500} 
                  onClick={()=> refreshFunction(dispatch)}
                  className={`NavLink ${hide}`} >КАТАЛОГ</Link>
            <Link activeClass="active" 
                  to="TimingAndDelivery" 
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={()=>refreshFunction(dispatch)}
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
        
        <NavLink to='/' className='header-LOGO'>
          <img 
            width={90} 
            height={70} 
            src={require('../Photos/Logo.png')}
            onClick={()=>refreshFunction(dispatch)}/>
        </NavLink>
        
        <div className='Hamburger' 
             onClick={()=>{
              (openHamburgerMenu === '')
                ? setOpenHamburgerMenu('close')
                  : setOpenHamburgerMenu('')

              if(localStorage.getItem('accessToken')){
                refreshFunction(dispatch);
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
                  onClick={()=>refreshFunction(dispatch)}
                  className={`NavLink `}>ГЛАВНАЯ</Link>
            <Link activeClass="active" 
                  to="CatalogOfWorks" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500}
                  onClick={()=>refreshFunction(dispatch)}
                  className={`NavLink ${hide}`}>КАТАЛОГ</Link>
            <Link activeClass="active" 
                  to="TimingAndDelivery" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500}
                  onClick={()=>refreshFunction(dispatch)}
                  className={`NavLink ${hide}`}>СРОКИ И ДОСТАКА</Link>
            <Link activeClass="active" 
                  to="AboutCashpo" 
                  spy={true} 
                  smooth={true} 
                  offset={-210} 
                  duration={500} 
                  onClick={()=>refreshFunction(dispatch)}
                  className={`NavLink ${hide}`}>О КАШПО</Link>
            <Link activeClass="active" 
                  to="ContactWithUs" 
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
