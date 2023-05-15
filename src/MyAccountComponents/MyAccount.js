import React from 'react'
import { refreshFunction } from '../MailFiles/App';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './Styles/MyAccount.css'

export const signOut = (dispatch) =>{
  dispatch({ type: 'UNCOMPLETED_AUTHORIZATION'})
  localStorage.removeItem('accessToken')
}

export default function MyAccount() {

  const countOfOrders = useSelector(state=>state.countOfOrders);
  const dispatch = useDispatch() 

  return (
    <div className='containerForMyAccount'>
      <NavLink onClick={()=>refreshFunction(dispatch)} to='/Profile' className='listItem'>Мой аккаунт</NavLink>
      <NavLink onClick={()=>refreshFunction(dispatch)} to='/OrdersArchive' className='listItem'>Архив заказов</NavLink>
      <NavLink onClick={()=>refreshFunction(dispatch)} to='/MyBasket' className='listItem'>Корзина (<span className='countOfOrders'>{`${countOfOrders}`}</span>)</NavLink>
      <NavLink onClick={()=>signOut(dispatch)} className='Link'>Выйти</NavLink>
    </div>
  )
}
