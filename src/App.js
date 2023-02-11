import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './App.css';
import Router from './Router';

export const refreshFunction = async () => {
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
      

function App() {

  const [isAuthorizate, setIsAuthorizate] = useState(localStorage.getItem('accessToken'));
  const [isOpenModal, setIsOpenModal] = useState(!true);

  const customStylesForModal = {
    content: {
      width: '40%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '20px'
    },
  } 

  return (
    <div className="App">
      <Router isAuthorizate = {isAuthorizate}
              setIsAuthorizate = {setIsAuthorizate}/>
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
