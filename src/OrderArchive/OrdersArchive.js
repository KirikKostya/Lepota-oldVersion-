import React, { useEffect, useState } from 'react';
import UpNavigation from '../Components/UpNavigation.js'
import LoadingComp from '../Loading/LoadingComp.js';
import ContactWithUs from '../Components/ContactWithUs.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Styles/OrdersArchive.css';


function ListOfOrders({LIST}) {

  const makeArray = (object) => {
    return [object]
  }

  useEffect(()=>{
    window.scrollTo(0, 0)
   }, [])

  return (
    <div className='mainContainerForArhive' id='hideNavBarMainLink'>
      {
        LIST.length === 0
          ? <div className='emptyArchive'>
              <h1>Ваш архив заказов пуст!</h1>
              <h3>Для пополнения архива вы должны создать и отправить нам заказ <NavLink to={'/MyBasket'}>в корзине</NavLink></h3>
            </div>
            : <>
                {
                  LIST.map((el, index)=>(
                    <div className='listContainer' key={index}>
                      <div className={'archiveCheck'}>
                        
                        <div className='date_numberOrder'>
                          <p>Заказ #<span>{el.id}</span></p>
                            {
                              makeArray(el.fullDate).map((fullDate, index)=>(
                                <p className='date' key={index}>{fullDate.Time} - {fullDate.Date}</p>
                              ))
                            }
                        </div>

                        <div className='customerName'>
                          <p>Заказчик :</p>
                          <span>{el.fio}</span>
                        </div>

                        <div className='orderItems'>
                          <p>Заказанные товары :</p>
                            {
                              el.cartItems.map((item, index)=>(
                                <div key={index} className={'item'}>
                                  <p onClick={()=>console.log(item)}>
                                    {item.item.name}
                                    <span className='variantInArchive'>
                                      {`( ${
                                      item.variants
                                        ? item.variants.map(el=>(
                                          el.name
                                        ))
                                          : item.kit
                                            ? item.kit.name
                                              : ''
                                      } )`}
                                    </span>
                                    {` x${item.amount}`}
                                  </p>
                                  <span>{item.price}p.</span>
                                </div>
                              ))
                            }
                        </div>

                        <div className='shippingType'>
                          <p>Тип получения :</p>
                          <span>{el.shipping && 'Доставка' || 'Самовывоз'}</span>
                        </div>

                        <div className='customer'>
                          <p>ИТОГО К ОПЛАТЕ :</p>
                          <span>= {el.totalPrice}p.</span>
                        </div>

                        <div className='orderStatus'>
                          <p>Статус Заказа :</p>
                          <span>Получен</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </>
      }
    </div>
  )
}

export default function OrdersArchive() {
  
  const [listOfOrdersInArchive, setListOfOrdersInArchive] = useState([]);

  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  const fetchingAllOrdersInArchive = () => {
    axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res=>{
      setListOfOrdersInArchive(res.data.data.reverse());
      dispatch({type: 'LOADING_IS_COMPLETED'});
    })
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data.reverse());
        dispatch({type: 'LOADING_IS_COMPLETED'});
      }
    })
  }

  useEffect(()=>{
    fetchingAllOrdersInArchive()
  }, [])

  return (
    <div className='containerForArchivePage'>
      <UpNavigation hide='hide'/>
      {
        isLoading
        ? <LoadingComp />
          : <ListOfOrders LIST={listOfOrdersInArchive} />
      }
      <ContactWithUs />
    </div>
  )
}
