import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpNavigation from '../Components/UpNavigation.js'
import Loading from 'react-loading';
import axios from 'axios';
import './Styles/OrdersArchive.css';


function ListOfOrders({LIST}) {

  const makeArray = (object) => {
    return [object]
  }

  return (
    <div className='mainContainerForArhive'>
      {
        LIST.length === 0
          ? <>sorry, no orders!</>
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
                                  <p>{item.item.name}</p>
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
      setListOfOrdersInArchive(res.data.data);
      dispatch({type: 'LOADING_IS_COMPLETED'});
    })
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data);
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
        ? <Loading
            type='spokes'
            color="#5da6f3"
            height="45px"
            width="45px" 
          />
          : <ListOfOrders LIST={listOfOrdersInArchive} />
      }
    </div>
  )
}
