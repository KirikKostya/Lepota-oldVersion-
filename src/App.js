import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

//refresh Token for authori- and registration (only this function uses fetch-request)
export const refreshFunction = async () => {
  if(localStorage.getItem('accessToken')){
    fetch('https://api.native-flora.tk/Auth/checkToken', {
      mode: 'cors',
        headers:{'x-access-token': localStorage.getItem('accessToken')}
      })

      .then(async res => {
        if(res.status === 401){
          fetch('https://api.native-flora.tk/Auth/Refresh', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
          })
            .then(res=>{
              if(res.status === 401){
                return res // dialog window to update
              } else {
                return res.json()
              }
            })
            .then(res=>localStorage.setItem('accessToken', res.data))
        }
      })
  }
}
      

function App() {

  const dispatch = useDispatch();
  const myAccountIsOpen = useSelector(state=>state.myAccountIsOpen);
  const [isOpenModal, setIsOpenModal] = useState(!true);

  return (
    <div className="App" 
         onClick={()=>{
          if(myAccountIsOpen){
            dispatch({type: 'CLOSE_MY_ACCOUNT'})
          }
         }}>
      <Router />
      <ReactModal 
        ariaHideApp={false}
        isOpen={isOpenModal}
      >
        <h1 className='warningHeader'>Приветствуем !</h1>
        <p className='warningMessage'>Вас долго не было с нами, вам необходимо повторно войти в аккаунт! </p>
        <button 
                  className='modal-closeBTN' 
                  onClick={()=>setIsOpenModal(!isOpenModal)}>Закрыть</button>  
      </ReactModal>
    </div>
  );
}

export default App;
