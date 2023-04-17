import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { sortByDate, sortByDileverStatus, sortByDileverType } from '../DropDowns/OptionList.js';
import SingleSelect from '../DropDowns/SingleSelect.js';
import axios from 'axios';
import Loading from '../Loading/LoadingComp.js'
import './Styles/OrdersArchive.css';
import LoadingComp2 from '../Loading/LoadingComp2.js';


export default function ListOfArchive({LIST, setList}) {

  const isLoading = useSelector(state=>state.isLoadingInArchive);
  const dispatch = useDispatch();

  const [deliveType, setDeliveType] = useState('Получен');

  //makes array from object
  const makeArray = (object) => {
    return [object]
  }

  const sortDate= (res, metric) => {
    if(metric.date){
      if(metric.date === 'Новые'){
        return res.data.data.sort((a,b) => b.id - a.id)
      } else {
        return res.data.data.sort((a,b) => a.id - b.id)
      }
    } else {
      return res.data.data
    }
  }

  const filterByType = (date, metric) => {
    if(metric.deliveType){
      if(metric.deliveType === 'Доставка'){
        return date.filter(item=>item.shipping === true)
      } else {
        return date.filter(item=>item.shipping === false)
      }
    } else {
      return date
    }
  } 

  const filterByStatus = (type, metric) => {
    if(metric.deliveStatus){
      if(metric.deliveStatus === 'Получен'){
        return type.filter(item=>item.status === 'Получен')
      } else {
        return type.filter(item=>item.status === 'Не получен')
      }
    } else {
      return type
    }
  } 

  //sorts list of archive by data
  const filterArchive = async (metric) => {
    dispatch({type: 'LOADING-Archive_IS_UNCOMPLETED'});
    await axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(async res=>{
      let date = await sortDate(res, metric)
      let type = await filterByType(date, metric)
      let status = await filterByStatus(type, metric)
      setList(status)
      dispatch({type: 'LOADING-Archive_IS_COMPLETED'});
    })
    .catch(err=>{
      if(err.response.status === 400){
        dispatch({type: 'LOADING-Archive_IS_COMPLETED'});
      }
    })

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
            :  <div className='mainListContainer'>
                {
                    isLoading 
                        ? <LoadingComp2 />
                            : LIST.map((el, index)=>(
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
                                            <p>
                                                {item.item.name}
                                                <span className='variantInArchive'>
                                                {`( ${
                                                item.variants
                                                    ? item.variants.map(el=>(
                                                    el.name
                                                    ))
                                                    : item.kit
                                                        ? item.kit.name
                                                        : 'Нет комплекта'
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
                                    <span className={deliveType === 'Получен' ? 'trueStatus' : 'falseStatus'}>
                                      {
                                        deliveType
                                      }
                                    </span>
                                    </div>
                                </div>
                                </div>
                            ))
                            }
                </div>
      }
      <div className='filterContainer'>
        <SingleSelect 
          options={sortByDate} 
          placeholder={'Сортировка по дате'}
        />
        <SingleSelect 
          options={sortByDileverType} 
          placeholder={'Тип доставки'} 
        />
        <SingleSelect 
          options={sortByDileverStatus} 
          placeholder={'Статус получения'}
        />
        <button 
          className='sortBTN' 
          onClick={() => {
            filterArchive(JSON.parse(localStorage.getItem('filterMetric')))
          }}>Применить фильтр
        </button>
        <span 
          className='clearFilter'
          onClick={()=>{
            localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }))
            filterArchive({ date: '', deliveType: '', deliveStatus: '' })
          }}
        >Очистить фильтрацию</span>
      </div>
    </div>
  )
}