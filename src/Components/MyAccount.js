import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/MyAccount.css'

export default function MyAccount({isAuthorizate, setIsAuthorizate}) {

  const SignOut = () =>{
    setIsAuthorizate(false);
    localStorage.clear();
  }

  return (
    <>
      {
        (isAuthorizate)
          ?<div className='ContainerForMyAccount'>
            <NavLink to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
            <NavLink to='/MyBasket' className='ListItem'>Архив заказов</NavLink>
            <NavLink to='/PurchaseArchive' className='ListItem'><span className='CountOrders'>0</span>Карзина</NavLink>
            <NavLink onClick={SignOut} className='Link'>Выйти</NavLink>
          </div>
            :<div className='ContainerForMyAccount'>
              <NavLink to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
              <NavLink to='/MyBasket' className='ListItem'>Архив заказов</NavLink>
              <NavLink to='/PurchaseArchive' className='ListItem'>Карзина</NavLink>
              <NavLink to='/Registration' className='Link'>Регистрация</NavLink>
            </div>
      }
    </>
  )
}
