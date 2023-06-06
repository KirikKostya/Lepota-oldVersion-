import React from 'react'
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Styles/MyAccount.css'
import { Dispatch } from 'redux';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { loadingComplate, loadingUncomplate, uncomplatedAuth} from '../ReduxToolkit/Slices'

export const signOut = (dispatch: Dispatch) =>{
  dispatch(loadingUncomplate());
  axios.post('https://api.native-flora.tk/Auth/Logout', {}, {
    headers:{'x-access-token': localStorage.getItem('accessToken')}  
  })
  .then(()=>localStorage.removeItem('accessToken'))
  .catch(err=>console.log(err));
  dispatch(loadingComplate());
  dispatch(uncomplatedAuth());
}

export default function MyAccount() {

  const countOfOrders = useSelector((state:IInitialState)=>state.countOfOrders);
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
