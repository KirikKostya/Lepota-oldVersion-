import React, { useEffect, useState } from 'react';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';
import { ICartItem } from '../Admin/Update/Interfaces/Interface';
import { refreshFunction } from '../MainFiles/App';
import { useDispatch } from 'react-redux';
import ContactWithUs from '../Components/ContactWithUs';
import UpNavigation from '../Components/UpNavigation';
import MainBasketField from './MainBasketField';
import Check from './Check';
import axios from 'axios';
import './Styles/MyBasket.css';

const MyBasket: React.FC = () => {

  const [ItemsInBasket, setItemsInBasket] = useState<ICartItem[]>([]);

  const dispatch = useDispatch()

  //takes all carts from basket-API
  const requestBasketFunc = async () => {
    dispatch(loadingUncomplate())
    await axios.post('https://api.native-flora.tk/Cart/All', {}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => {
      !res.data.data
        ? setItemsInBasket([])
          : setItemsInBasket(res.data.data.cartItems || [])
      dispatch(loadingComplate())
    })
  }

  useEffect(()=>{
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
          <Check ItemsInBasket={ItemsInBasket} requestBasketFunc={requestBasketFunc}/>
        </div>
      <ContactWithUs />
    </>
  )
}

export default MyBasket;