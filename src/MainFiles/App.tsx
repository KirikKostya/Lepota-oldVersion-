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
import { Dispatch } from 'redux';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { changeRefreshTokenStatus, closeAccount} from '../ReduxToolkit/Slices'
import WarningModalView from '../Modals/WarningModalView';

export const refreshFunction = async (dispatch: Dispatch, newFunc:()=>void) => {
  try {
    if(localStorage.getItem('accessToken')){
      await axios.get('https://api.native-flora.tk/Auth/checkToken', {
        withCredentials: true,
        headers:{'x-access-token': localStorage.getItem('accessToken')}
      });
    }
      newFunc()
  } catch (err: any) {
    if(err.response.status === 401){
      try {
        const res = await axios.get('https://api.native-flora.tk/Auth/Refresh', {
          withCredentials: true
        });
        localStorage.setItem('accessToken', res.data.data);
        newFunc()
      } catch (error: any) {
        if(error.response.status === 401){
          dispatch(changeRefreshTokenStatus(true));
        } else {
          console.log('Something went wrong!');
        }
      }
    }
  }
}


function App() {
  
  const myAccountIsOpen = useSelector((state:IInitialState)=>state.myAccountIsOpen);
  const refreshTokenIsExpired = useSelector((state:IInitialState)=>state.refreshTokenIsExpired);
  const isLoading = useSelector((state:IInitialState)=>state.isLoading);
  
  const dispatch = useDispatch();

  useEffect(() =>{
    refreshFunction(dispatch, ()=>{
      localStorage.getItem('accessToken') && checkIsAdmine(dispatch)
    });
    // setInterval(()=>console.log(isLoading), 1000)
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
          className='spin'
        />
      }
      <div 
        className={`app ${isLoading && 'blur'}`} 
        onClick={ ()=> myAccountIsOpen && dispatch(closeAccount()) }
      >
        <Router />
        <WarningModalView warningMessageIsOpen={refreshTokenIsExpired} header={'Приветствуем !'}>
          <p>Вас долго не было с нами, вам необходимо повторно войти в аккаунт! </p>
          <button 
            className='modal-closeBTN' 
            onClick={()=>{
              dispatch(changeRefreshTokenStatus(false))
              signOut(dispatch)
            }}>Закрыть</button>  
        </WarningModalView>
      </div>
      { !Cookies.get('cookieActivate') && <CookieAlert /> }
    </>
  );
}

export default App;
