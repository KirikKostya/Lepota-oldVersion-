import React, { useEffect } from 'react';
import InfoIcon from '../Icons/InfoIcon';
import Router from './Router';
import { changeRefreshTokenStatus, closeAccount} from '../ReduxToolkit/Slices';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { signOut } from '../MyAccountComponents/MyAccount';
import { checkIsAdmine } from '../Admin/AdmineController';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CookieAlert from '../Cookie/CookieAlert';
import ModalView from '../Modals/ModalView';
import Loading from 'react-loading';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Styles/App.css';

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


const App: React.FC = () => {
  
  const myAccountIsOpen = useSelector((state:IInitialState)=>state.myAccountIsOpen);
  const refreshTokenIsExpired = useSelector((state:IInitialState)=>state.refreshTokenIsExpired);
  const isLoading = useSelector((state:IInitialState)=>state.isLoading);
  
  const dispatch = useDispatch();

  useEffect(() =>{
    refreshFunction(dispatch, ()=>localStorage.getItem('accessToken') && checkIsAdmine(dispatch));
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
        onClick={()=> myAccountIsOpen && dispatch(closeAccount())}
      >
        <Router />
        <ModalView isOpen={refreshTokenIsExpired}>
            <h2 className='headerModal-antd'><InfoIcon/> Приветствуем !</h2>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <h4 style={{width: '95%', textAlign: 'start'}}>Вас долго не было с нами, вам необходимо повторно войти в аккаунт! </h4>
              <button 
                className='modal-closeBTN' 
                onClick={()=>{
                  dispatch(changeRefreshTokenStatus(false))
                  signOut(dispatch);
                }}>Закрыть</button>  
            </div>
        </ModalView>
      </div>
      { Cookies.get('cookieActivate') && <CookieAlert /> }
    </>
  );
}

export default App;
