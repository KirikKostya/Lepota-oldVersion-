import React from 'react';
import { loadingComplate, loadingUncomplate, uncomplatedAuth } from '../ReduxToolkit/Slices';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';
import axios from 'axios';
import './Styles/MyAccount.css';

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

const MyAccount: React.FC = () => {

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

export default MyAccount;
