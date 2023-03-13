import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { refreshFunction } from '../App';
import './Styles/MyAccount.css'

export default function MyAccount() {

  const dispatch = useDispatch()
  const countOfOrders = useSelector(state=>state.countOfOrders);

  const SignOut = () =>{
    dispatch({ type: 'UNCOMPLETED_AUTHORIZATION'})
    localStorage.clear();
  }

  return (
          <div className='ContainerForMyAccount'>
            <NavLink onClick={refreshFunction} to='/Profile' className='ListItem'>Мой аккаунт</NavLink>
            <NavLink onClick={refreshFunction} to='/GoodsArchive' className='ListItem'>Архив заказов</NavLink>
            <NavLink onClick={refreshFunction} to='/MyBasket' className='ListItem'>Корзина (<span className='countOfOrders'>{`${countOfOrders}`}</span>)</NavLink>
            <NavLink onClick={SignOut} className='Link'>Выйти</NavLink>
          </div>
            

  )
}
