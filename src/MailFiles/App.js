import React, { useEffect } from 'react';
import CookieAlert from '../Cookie/CookieAlert';
import ReactModal from 'react-modal';
import Loading from 'react-loading';
import Router from './Router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAdmine } from '../Admin/AdmineController';
import { signOut } from '../MyAccountComponents/MyAccount';
import axios from 'axios';
import './Styles/App.css';

//refresh Token for authori- and registration (only this function uses fetch-request)
export const refreshFunction = async (dispatch, newFunc) => {
  new Promise((resolve, reject) => {
    localStorage.getItem('accessToken') 
      &&
        axios.get('https://api.native-flora.tk/Auth/checkToken', {
          withCredentials: true,
          headers:{'x-access-token': localStorage.getItem('accessToken')}
        })
        .then(resolve)
        .catch(async res => {
          if(res.response.status === 401){
            axios.get('https://api.native-flora.tk/Auth/Refresh', {
              withCredentials: true
            })
            .then(res=>{
              localStorage.setItem('accessToken', res.data.data)
              resolve()
            })
            .catch(res=>{
              (res.response.status === 401)
                ? dispatch({type: 'SET_REFRESH-TOKEN_STATUS', payload: true})  
                  : console.log('Что-то пошло не так!')
            })
          }
        })
  })
  .then(newFunc)
}

function App() {
  
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const refreshTokenIsExpired = useSelector(state=>state.refreshTokenIsExpired);
  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  useEffect(()=>{
    refreshFunction(dispatch, ()=>checkIsAdmine(dispatch))
  }, [])
  
  return (
    <>
      {
        isLoading 
        &&
        <Loading
          type="spokes"
          color="black"
          height="50px"
          width="50px"
          padding="20px"
          className='spin'
        />
      }
      <div 
        className={`app ${isLoading && 'blur'}`} 
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
      { !Cookies.get('cookieActivate') && <CookieAlert /> }
    </>
  );
}

export default App;
