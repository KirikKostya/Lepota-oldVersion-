import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpNavigation from '../Components/UpNavigation.js'
import Loading from 'react-loading';
import axios from 'axios';
import './Styles/OrdersArchive.css';


function ListOfOrders({LIST}) {
  return (
    <div className='mainContainerForArhive'>
      {
        LIST.length === 0
          ? <>sorry, no orders!</>
            : <>
                {
                  LIST.map(el=>(
                    <div className='listContainer' key={el.id}>
                      <div className={'archiveCheck'}>
                        
                        <div className='date_numberOrder'>
                          <p>Заказ #<span>{el.id}</span></p>
                          <p>19.03.2023</p>
                        </div>

                        <div className='customerName'>
                          <p>Заказчик :</p>
                          <span>{el.fio}</span>
                        </div>

                        <div className='orderItems'>
                          <p>Заказанные товары :</p>
                            {
                              el.cartItems.map(item=>(
                                <div key={item.id} className={'item'}>
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
      console.log(res.data.data)
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
