import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './Router';

export const refreshFunction = async()=>{
  let response = await fetch ('https://api.hlofiys.tk/test/user', {
      method: 'GET',
      mode: 'cors',
          headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(async res => {
      if(res.status === 401){
        let response2 = await fetch('https://api.hlofiys.tk/auth/refresh', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
          })
    .then(res=>{
        if(res.status === 401){
          console.log('You must login one more time!')
        } else {
          return res
        }
    })  
    .then(res=>res.json())
    .then(res=>localStorage.setItem('accessToken', res.accessToken))
    }
  })
}

function App() {

  const [isAuthorizate, setIsAuthorizate] = useState(localStorage.getItem('accessToken'))
  console.log(isAuthorizate)
  return (
    <div className="App">
      <Router isAuthorizate = {isAuthorizate} 
              setIsAuthorizate = {setIsAuthorizate}/>
    </div>
  );
}

export default App;
