import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './Router';

export const refreshFunction = async()=>{
  let response = await fetch('http://129.159.242.47:8081/Auth/checkToken', {
    mode: 'cors',
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(async res => {
      if(res.status === 401){
        let response2 = await fetch('http://129.159.242.47:8081/Auth/Refresh', {
            method: 'GET',
            mode: 'cors',
          })
        .then(res=>{
            if(res.status === 401){
              alert('You must login one more time!') // dialog window to update
            } else {
              return res
            }
        })
        .then(res=>localStorage.setItem('accessToken', res.data.data))
      }
  })
}

function App() {

  const [isAuthorizate, setIsAuthorizate] = useState(localStorage.getItem('accessToken'))
  return (
    <div className="App">
      <Router isAuthorizate = {isAuthorizate} 
              setIsAuthorizate = {setIsAuthorizate}/>
    </div>
  );
}

export default App;
