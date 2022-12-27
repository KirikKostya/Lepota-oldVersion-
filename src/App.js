import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './Router';

function App() {

  const refreshFunction = async()=>{
      
    let response = await fetch ('https://api.hlofiys.tk/test/user', {
      method: 'GET',
      mode: 'cors',
          headers:{'x-access-token': localStorage.getItem('accessToken')}
    })

    if(response.status === 401){
      let response2  = await fetch('https://api.hlofiys.tk/auth/refresh', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include'
        })
      let JsonResponse2 = await response2.json();
      let RefreshAccessToken = localStorage.setItem('accessToken', JsonResponse2.accessToken);
      console.log(JsonResponse2.accessToken)

      if(response2.status === 401){
        console.log('You must login one more time!')
      }
      
    }

  }

  const [accessTokenStatus, setAccessTokenStatus] = useState(true)

  useEffect(()=>{
    setInterval(()=>{
      refreshFunction()
    },1000*30)
    
  },[accessTokenStatus])

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
