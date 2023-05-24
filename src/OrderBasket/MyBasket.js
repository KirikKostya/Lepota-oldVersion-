import React, {useEffect, useState} from 'react'
import MainBasketField from './MainBasketField'
import UpNavigation from '../Components/UpNavigation'
import ContactWithUs from '../Components/ContactWithUs'
import Check from './Check'
import { refreshFunction } from '../MailFiles/App'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Styles/MyBasket.css'

export default function MyBasket() {

  const [ItemsInBasket, setItemsInBasket] = useState([])

  const dispatch = useDispatch()

  //takes all carts from basket-API
  const requestBasketFunc = async () => {
    await axios.post('https://api.native-flora.tk/Cart/All', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => {
      if(!res.data.data){
        setItemsInBasket([])
      } else {
        setItemsInBasket(res.data.data.cartItems)
      }
      dispatch({type: 'LOADING_IS_COMPLETED'})
    })
  }

  useEffect(()=>{
    dispatch({type: 'LOADING_IS_UNCOMPLETED'})
    refreshFunction(dispatch, requestBasketFunc)
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <UpNavigation hide='hide'/>
        <div className='fullContainer' id='hideNavBarMainLink' style={{ 'alignItems': ItemsInBasket.length === 0 ? 'center' : 'start'}}>
          <div className='mainFielfForBasket'>
            <div className='basketParametrs'>
              <p id='fullName'>Товар</p>
              <p id='price'>Цена</p>
              <p id='amount'>Кол-во</p>
              <p id='totalPrice'>Сумма</p>
            </div>
            <MainBasketField 
              ItemsInBasket = {ItemsInBasket}
              setItemsInBasket = {setItemsInBasket} 
              requestBasketFunc = {requestBasketFunc}
            />
          </div>
          <Check ItemsInBasket = {ItemsInBasket} requestBasketFunc={requestBasketFunc}/>
        </div>
      <ContactWithUs />
    </>
  )
}
