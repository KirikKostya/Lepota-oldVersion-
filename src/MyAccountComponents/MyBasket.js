import React, {useEffect, useState} from 'react'
import '../MyAccountComponents/Styles/MyBasket.css'
import UpNavigation from '../Components/UpNavigation.js'
import axios from 'axios'

export default function MyBasket({isAuthorizate, setIsAuthorizate }) {

  const [ItemsInBasket, setItemsInBasket] = useState([])

  const deleteItem = (id) => {
    axios.post('https://api.hlofiys.tk/cart/delete', {
      id: id
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .catch(err => console.log(err))
    console.log('123')
  }

  const requestBasketFunc = async () => {
  axios.get('https://api.hlofiys.tk/cart/all', {
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .then(res=>setItemsInBasket(res.data))
  }

  useEffect(()=>{
    requestBasketFunc()
  }, [])

  return (
    <>
      <UpNavigation isAuthorizate={isAuthorizate} setIsAuthorizate = {setIsAuthorizate}/>
      <div className='MainFielfForBasket'>
          {
            ItemsInBasket.map(item => (
              <div className='Item' key={item.id}>
                <img src={item.icon} className='Icon'/>
                <h4>{item.name}</h4>
                <div className='ChangeAmount'>
                  <input id='ChangeInput'
                         type='number'
                         className='ChangeInput' 
                         min={0} 
                         placeholder={item.amount}/>
                </div>
                <h3>{item.price*item.amount} Br</h3>
                <button className='deleteItem' onClick={()=>deleteItem(item.id)}>&times;</button>
              </div>
            ))
          }
      </div>
    </>
  )
}
