import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../MyAccountComponents/MyAccount';
import ReactModal from 'react-modal';
import Router from './Router';
import axios from 'axios';
import './Styles/App.css';

//refresh Token for authori- and registration (only this function uses fetch-request)
export const refreshFunction = async (dispatch) => {
  axios.get('https://api.native-flora.tk/Auth/checkToken', {
    withCredentials: true,
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .catch(async res => {
    if(res.response.status === 401){
      axios.get('https://api.native-flora.tk/Auth/Refresh', {
        withCredentials: true
      })
      .then(res=>{
        localStorage.setItem('accessToken', res.data.data)
      })
      .catch(res=>{
        (res.response.status === 401)
          ? dispatch({type: 'SET_REFRESH-TOKEN_STATUS', payload: true}) // dialog window to update  
            : console.log('Что-то пошло не так!')
      })
    }
  })
}


function App() {
  
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const refreshTokenIsExpired = useSelector(state=>state.refreshTokenIsExpired);
  const dispatch = useDispatch();
  
  return (
    <div 
      className="App" 
      onClick={()=>{
        if(myAccountIsOpen){
          dispatch({type: 'CLOSE_MY_ACCOUNT'})
        }
      }
    }>
      <Router />
      <ReactModal 
        ariaHideApp={false}
        isOpen={refreshTokenIsExpired}
      >
        <h1 className='warningHeader'>Приветствуем !</h1>
        <p className='warningMessage'>Вас долго не было с нами, вам необходимо повторно войти в аккаунт! </p>
        <button 
          className='modal-closeBTN' 
          onClick={()=>{
            dispatch({type: 'SET_REFRESH-TOKEN_STATUS', payload: false})
            signOut(dispatch)
          }}>Закрыть</button>  
      </ReactModal>
    </div>
  );
}

export default App;
