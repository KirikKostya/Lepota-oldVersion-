import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { refreshFunction } from '../App';
import axios from 'axios';
import './Styles/MyAccount.css'

export default function MyAccount({isAuthorizate, setIsAuthorizate}) {

  const [amountOrderInBasket, setAmountOrderInBasket] = useState(0);

  const SignOut = () =>{
    setIsAuthorizate(false);
    localStorage.clear();
  }

  useEffect(()=>{
    axios.post( 'https://api.native-flora.tk/Cart/Count', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => setAmountOrderInBasket(res.data.data))
  })

  return (
    <>
      {
        (isAuthorizate)
          ?<div className='ContainerForMyAccount'>
            <NavLink onClick={refreshFunction} to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
            <NavLink onClick={refreshFunction} to='/GoodsArchive' className='ListItem'>Архив заказов</NavLink>
            <NavLink onClick={refreshFunction} to='/MyBasket' className='ListItem'><span className='CountOrders'>{amountOrderInBasket}</span>Корзина</NavLink>
            <NavLink onClick={SignOut} className='Link'>Выйти</NavLink>
          </div>
            :<div className='ContainerForMyAccount'>
              <NavLink onClick={refreshFunction} to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
              <NavLink onClick={refreshFunction} to='/GoodsArchive' className='ListItem'>Архив заказов</NavLink>
              <NavLink onClick={refreshFunction} to='/MyBasket' className='ListItem'>Корзина</NavLink>
              <NavLink onClick={refreshFunction} to='/Registration' className='Link'>Регистрация</NavLink>
            </div>
      }
    </>
  )
}
