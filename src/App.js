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

  const customStylesForModal = {
    content: {
      width: '50%',
      height: '50%',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      borderRadius: '20px'
    },
  } 

  return (
    <div className="App" 
         onClick={()=>{
          if(myAccountIsOpen){
            dispatch({type: 'CLOSE_MY_ACCOUNT'})
          }
         }}>
      <Router />
      <ReactModal 
        isOpen={isOpenModal}
        style={customStylesForModal}
      >
        <h2 className='warningHeader'>Вы снова с нами!</h2>
        <p className='warningMessage'>Вас долго не было с нами, вам необходимо повторно войти в аккаунт! </p>
        <button className='SignInModalBtn' onClick={()=>setIsOpenModal(!isOpenModal)}>Войти</button>
      </ReactModal>
    </div>
  );
}

export default App;
