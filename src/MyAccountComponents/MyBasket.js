import React, {useEffect, useState} from 'react'
import '../MyAccountComponents/Styles/MyBasket.css'
import UpNavigation from '../Components/UpNavigation.js'
import axios from 'axios'

export default function MyBasket({isAuthorizate, setIsAuthorizate }) {

  const [ItemsInBasket, setItemsInBasket] = useState([])
  let [countOfOrder, setCountOfOrder] = useState(Number)
  const [summer, setSummer] = useState(0)
  // let ChangeInput;

  const requestBasketFunc = async () => {
    let response = await fetch('https://api.hlofiys.tk/cart/all', {
      method: 'GET',
      mode: 'cors',
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res=>res.json())
    .then(res=>setItemsInBasket(res))
  }
  // useEffect(()=>{
  //   ChangeInput = document.querySelectorAll('#ChangeInput');
  // }, [])
  return (
    <>
      <UpNavigation isAuthorizate={isAuthorizate} setIsAuthorizate = {setIsAuthorizate}/>
      <div className='MainFielfForBasket'>
          <button onClick={requestBasketFunc}>click</button>
          {
            ItemsInBasket.map(item => (
              <div className='Item' key={item.id}>
                <p>{item.id}</p>
                <img src={item.icon} className='Icon' />
                <h4>{item.name}</h4>
                <div className='ChangeAmount'>
                  <input id='ChangeInput'
                         type='number'
                         className='ChangeInput' 
                         min={0} 
                         placeholder={item.amount}/>
                </div>
                <h3>{item.price} Br</h3>
              </div>
            ))
          }
      </div>
    </>
  )
}
