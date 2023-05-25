import React from 'react'
import { refreshFunction } from '../MailFiles/App';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Styles/MyAccount.css'
import { Dispatch } from 'redux';
import { AllParamsI } from '..';

export const signOut = (dispatch: Dispatch) =>{
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post('https://api.native-flora.tk/Auth/Logout', {}, {
    headers:{'x-access-token': localStorage.getItem('accessToken')}  
  })
  .then(()=>localStorage.removeItem('accessToken'))
  .catch(err=>console.log(err))
  dispatch({type: 'LOADING_IS_COMPLETED'})
  dispatch({ type: 'UNCOMPLETED_AUTHORIZATION'})
}

export default function MyAccount() {

  const countOfOrders = useSelector((state:AllParamsI)=>state.countOfOrders);
  const dispatch = useDispatch() 

  return (
    <div className='containerForMyAccount'>
      <NavLink onClick={()=>refreshFunction(dispatch,()=>{})} to='/Profile' className='listItem'>Мой аккаунт</NavLink>
      <NavLink onClick={()=>refreshFunction(dispatch,()=>{})} to='/OrdersArchive' className='listItem'>Архив заказов</NavLink>
      <NavLink onClick={()=>refreshFunction(dispatch,()=>{})} to='/MyBasket' className='listItem'>Корзина (<span className='countOfOrders'>{`${countOfOrders}`}</span>)</NavLink>
      <NavLink onClick={()=>signOut(dispatch)} to='/' className='Link'>Выйти</NavLink>
    </div>
  )
}
