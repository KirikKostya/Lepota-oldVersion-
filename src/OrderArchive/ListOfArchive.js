import React from 'react';
import { SortByDate, SortByDileverStatus, SortByDileverType } from '../DropDowns/OptionList.js';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SingleSelect from '../DropDowns/SingleSelect.js';
import axios from 'axios';
import './Styles/OrdersArchive.css';


export default function ListOfArchive({ LIST, setList }) {

  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

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
      if(metric.deliveStatus === 'Принят в обработку'){
        return type.filter(item=>item.shippingStatus === 'BeingProcessed')
      } else if(metric.deliveStatus === 'В пути'){
        return type.filter(item=>item.shippingStatus === 'Shipping')
      } else if(metric.deliveStatus === 'Получен'){
        return type.filter(item=>item.shippingStatus === 'Delivered')
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
      let dateFiltered = await sortDate(res, metric)
      let typeFiltered = await filterByType(dateFiltered, metric)
      let statusFiltered = await filterByStatus(typeFiltered, metric)
      setList(statusFiltered)
      dispatch({type: 'LOADING-Archive_IS_COMPLETED'});
    })
    .catch(err=>{
      if(err.response.status === 400){
        dispatch({type: 'LOADING-Archive_IS_COMPLETED'});
      }
    })

  } 

  //on page writting status of delivering
  const checkedStatusOfDelivering = (param) => {
    return param == 'BeingProcessed'
            ? 'Принят в обработку'
              : param == 'Shipping'
                ? 'В пути'
                  : param == 'Delivered'
                    ? 'Доставлен'
                      : 'Не определено'
  }

  //makes Styles For Status Of Delivering
  const creatingStyles = (param) => {
    return param == 'BeingProcessed'
            ? {color: '#61aeff'}
              : param == 'Shipping'
                ? {color: '#eb0c0c'}
                  : param == 'Delivered'
                    ? {calor: '#00BB40'}
                      : {color: 'black'}
  }

  return (
    <div className='mainContainerForArhive' id='hideNavBarMainLink'>
      {
        isLoading 
          ? <div className='mainListContainer'></div>
            : LIST.length === 0
                ? <div className='emptyArchive'>
                    <h1>Ваш архив заказов пуст!</h1>
                    <h3>Для пополнения архива вы должны создать и отправить нам заказ <NavLink to={'/MyBasket'}>в корзине</NavLink></h3>
                  </div>
                  : <div className='mainListContainer'>
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
                                    <div key={index} className='item'>
                                      <p>
                                          {item.item.name}
                                          <span className='variantInArchive'>
                                          {`( 
                                              ${
                                                item.variants
                                                    ? item.variants.map(el=>(
                                                        el === null ? 'Нет комплекта' : el.name
                                                      ))
                                                      : item.kit
                                                          ? item.kit.name
                                                            : 'Нет комплекта'
                                              } 
                                            )`
                                          }
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
                                <span style={creatingStyles(el.shippingStatus)}>
                                  {checkedStatusOfDelivering(el.shippingStatus)} 
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                      <button onClick={()=>console.log(LIST)}>123</button>
                    </div>
      }
      <div className='filterContainer'>
        <SingleSelect 
          options={SortByDate} 
          placeholder={'Сортировка по дате'}
          width={'70%'}
          type={'sorting'}
        />
        <SingleSelect 
          options={SortByDileverType} 
          placeholder={'Тип доставки'} 
          width={'70%'}
          type={'sorting'}
        />
        <SingleSelect 
          options={SortByDileverStatus} 
          placeholder={'Статус получения'}
          width={'70%'}
          type={'sorting'}
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