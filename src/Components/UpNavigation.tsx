import React, { useState } from 'react';
import { closeAccount, openAccount, setCountOfOrder } from '../ReduxToolkit/Slices';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import MyAccount from '../MyAccountComponents/MyAccount';
import MyAccountIcon from '../Icons/MyAccountIcon';
import SignInIcon from '../Icons/SignInIcon';
import axios from 'axios';
import './Styles/UpNavigation.css';

interface IUpNavProps{
  hide: string 
}

const UpNavigation: React.FC<IUpNavProps> = (props) => {
  
  const { hide } = props;
  
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<string>('close');
  
  const isAuthorizate = useSelector((state:IInitialState)=>state.isAuthorizate);
  const myAccountIsOpen = useSelector((state:IInitialState)=>state.myAccountIsOpen);
  const dispatch = useDispatch();
  
  const getCountOfOrder = ():void => {
    axios.post( 'https://api.native-flora.tk/Cart/Count', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => dispatch(setCountOfOrder(res.data.data)))
  }

  return (
    <>
      <div id='upNav' className='upNavContainer'>
        <div className='fillUpNav'>
          {
            isAuthorizate
              ? <MyAccountIcon 
                  onClick={()=>{
                    myAccountIsOpen
                      ? dispatch(dispatch(closeAccount())) 
                        : dispatch(openAccount()) 
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
                  onClick={()=>refreshFunction(dispatch, ()=>{})}
                  className={`NavLink`}>ГЛАВНАЯ</Link>
            <Link activeClass="active" 
                  to="catalogOfWorks" 
                  spy={true} 
                  smooth={true} 
                  offset={-60} 
                  duration={500} 
                  onClick={()=>refreshFunction(dispatch, ()=>{})}
                  className={`NavLink ${hide}`}>КАТАЛОГ</Link>
            <Link activeClass="active" 
                  to="timingAndDelivery" 
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={()=>refreshFunction(dispatch, ()=>{})}
                  className={`NavLink ${hide}`}>СРОКИ И ДОСТАВКА</Link>
            <Link activeClass="active" 
                  to="aboutCashpo" 
                  spy={true} 
                  smooth={true} 
                  offset={-100} 
                  duration={500} 
                  onClick={()=>refreshFunction(dispatch, ()=>{})}
                  className={`NavLink ${hide}`}>О КАШПО</Link>
            <Link activeClass="active" 
                  to="contactWithUs" 
                  spy={true} 
                  smooth={true} 
                  offset={-65} 
                  duration={500} 
                  onClick={()=>refreshFunction(dispatch, ()=>{})}
                  className={`NavLink`}>КОНТАКТЫ</Link>
          </div>
          <NavLink to='/' className='header-LOGO'>
            <img 
              width={90} 
              height={70} 
              src={require('../Photos/Logo.png')}
              alt='LOGO'
              onClick={()=>refreshFunction(dispatch, ()=>{})}/>
          </NavLink>
          <div className='hamburger' 
              onClick={()=>{
                (openHamburgerMenu === '')
                  ? setOpenHamburgerMenu('close')
                    : setOpenHamburgerMenu('')

                if(localStorage.getItem('accessToken')){
                  refreshFunction(dispatch,()=>{});
                }
            }}>☰</div>
          { myAccountIsOpen && <MyAccount /> }
        </div>
      </div>
      <div className={`hamburgerNavLinks ${openHamburgerMenu}`} >
        <Link activeClass="active" 
              to={`${hide? 'hideNavBarMainLink' : 'main'}`}
              spy={true} 
              smooth={true} 
              offset={-230} 
              duration={500} 
              isDynamic={true} 
              onClick={()=>refreshFunction(dispatch,()=>{})}
              className={`NavLink `}>ГЛАВНАЯ</Link>
        <Link activeClass="active" 
              to="catalogOfWorks" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500}
              onClick={()=>refreshFunction(dispatch,()=>{})}
              className={`NavLink ${hide}`}>КАТАЛОГ</Link>
        <Link activeClass="active" 
              to="timingAndDelivery" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500}
              onClick={()=>refreshFunction(dispatch,()=>{})}
              className={`NavLink ${hide}`}>СРОКИ И ДОСТАКА</Link>
        <Link activeClass="active" 
              to="aboutCashpo" 
              spy={true} 
              smooth={true} 
              offset={-210} 
              duration={500} 
              onClick={()=>refreshFunction(dispatch,()=>{})}
              className={`NavLink ${hide}`}>О КАШПО</Link>
        <Link activeClass="active" 
              to="contactWithUs" 
              spy={true} 
              smooth={true} 
              offset={-180} 
              duration={500}
              onClick={()=>refreshFunction(dispatch,()=>{})}
              className={`NavLink `}>КОНТАКТЫ</Link>
      </div>
    </>
  )
}

export default UpNavigation;
