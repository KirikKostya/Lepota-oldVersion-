import React, {useEffect, useRef, useState} from 'react'
import '../MyAccountComponents/Styles/MyBasket.css'
import UpNavigation from '../Components/UpNavigation.js'
import axios from 'axios'
import Loading from 'react-loading'
import ContactWithUs from '../Components/ContactWithUs'
import { useDispatch, useSelector } from 'react-redux'
import MainBasketField from './MainBasketField'
import Check from './Check'

export default function MyBasket() {

  const [ItemsInBasket, setItemsInBasket] = useState([])

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.isLoading)


  const requestBasketFunc = async () => {
    await axios.post( 'https://api.native-flora.tk/Cart/All', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => {
      setItemsInBasket(res.data.data.cartItems)
    })
    .catch(err => {
      setItemsInBasket([])
    })
     dispatch({type: 'LOADING_IS_COMPLETED'})
  }

  useEffect(()=>{
   requestBasketFunc()
  }, [])

  return (
    <>
      <UpNavigation hide='hide'/>

      <div className='fullContainer' id='HideNavBarMainLink'>
        <div className='MainFielfForBasket'>
          <div className='basketParametrs'>
            <p id='fullName'>Товар</p>
            <p id='price'>Цена</p>
            <p id='amount'>Кол-во</p>
            <p>Сумма</p>
          </div>
            {
              isLoading
                ? <div className='loading-basket'>
                    <Loading
                      type="spokes"
                      color="black"
                      height="45px"
                      width="45px" 
                    />
                  </div>
                  : <MainBasketField 
                      ItemsInBasket = {ItemsInBasket}
                      setItemsInBasket = {setItemsInBasket} 
                      requestBasketFunc = {requestBasketFunc}
                    />
            }
        </div>
        <Check />
      </div>
      
      <ContactWithUs />
    </>
  )
}
