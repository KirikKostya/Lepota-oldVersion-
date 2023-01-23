import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { refreshFunction } from '../App';
import './Styles/MyAccount.css'

export default function MyAccount({isAuthorizate, setIsAuthorizate}) {

  const [amountOrderInBasket, setAmountOrderInBasket] = useState(0);

  const SignOut = () =>{
    setIsAuthorizate(false);
    localStorage.clear();
  }

  useEffect(()=>{
    // fetch('https://api.hlofiys.tk/cart/count', {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers:{'x-access-token': localStorage.getItem('accessToken')}
    // })
    // .then(res=>(res.status === 401)?refreshFunction():'')
    // // .then(res=>res.json())
    // // .then(res=>setAmountOrderInBasket(res))
    // .catch(err=>console.log(err))
  })

  return (
    <>
      {
        (isAuthorizate)
          ?<div className='ContainerForMyAccount'>
            <NavLink to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
            <NavLink to='/GoodsArchive' className='ListItem'>Архив заказов</NavLink>
            <NavLink to='/MyBasket' className='ListItem'><span className='CountOrders'>{amountOrderInBasket}</span>Корзина</NavLink>
            <NavLink onClick={SignOut} className='Link'>Выйти</NavLink>
          </div>
            :<div className='ContainerForMyAccount'>
              <NavLink to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
              <NavLink to='/GoodsArchive' className='ListItem'>Архив заказов</NavLink>
              <NavLink to='/MyBasket' className='ListItem'>Корзина</NavLink>
              <NavLink to='/Registration' className='Link'>Регистрация</NavLink>
            </div>
      }
    </>
  )
}
