import React, {useEffect, useState} from 'react'
import '../MyAccountComponents/Styles/MyBasket.css'
import UpNavigation from '../Components/UpNavigation.js'
import axios from 'axios'

export default function MyBasket({isAuthorizate, setIsAuthorizate }) {

  const [ItemsInBasket, setItemsInBasket] = useState([])
  const [isBasketEmpty, setIsBasketEmpty] = useState(true)

  const deleteItem = async (id) => {{
    let deleteResponce = await axios.delete('https://api.hlofiys.tk/cart/delete', {
      headers:{'x-access-token': localStorage.getItem('accessToken')},
      data:{ id: id }
    })
    
    let updateResponce = await requestBasketFunc()
  }}

  const requestBasketFunc = async () => {
  axios.post( 'http://129.159.242.47:8081/Cart/All', {}, {
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .then(res=>setItemsInBasket(res.data))
  .catch(err=> {
    if(err.response.status === 404){
      setIsBasketEmpty(true)
    }
  })
  }

  useEffect(()=>{
    requestBasketFunc()
  }, [])

  return (
    <>
      <UpNavigation isAuthorizate={isAuthorizate} setIsAuthorizate = {setIsAuthorizate}/>
      <div className='MainFielfForBasket'>
          {isBasketEmpty
            ?<>Sorry</>
              :ItemsInBasket.map(item => (
                <div className='Item' key={item.id}>
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
