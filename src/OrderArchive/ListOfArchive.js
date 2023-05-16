import React from 'react';
import SingleSelect from '../DropDowns/SingleSelect.js';
import { SortByDate, SortByDileverStatus, SortByDileverType } from '../DropDowns/OptionList.js';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Styles/OrdersArchive.css';


export default function ListOfArchive({ LIST, setList }) {

  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  //makes array from object
  const makeArray = (object) => {
    return [object]
  }

  //sorts data by date
  const sortDate= (res, metric) => {
    return(
      metric.date
      &&
      metric.date === 'Новые'
          ? res.data.data.sort((a,b) => b.id - a.id)
            : res.data.data.sort((a,b) => a.id - b.id)
      || res.data.data
    )
  }

  //sorts data by type of delivering
  const filterByType = (data, metric) => {
    if(metric.deliveType){
      return(
        metric.deliveType === 'Доставка'
          ? data.filter(item=>item.shipping === true)
            : data.filter(item=>item.shipping === false)
      )
    } 
    return data
  } 

  //sorts data by status of delivering
  const filterByStatus = (type, metric) => {
    return(
      metric.deliveStatus
      &&
      metric.deliveStatus === 'Принят в обработку'
        ? type.filter(item=>item.shippingStatus === 'BeingProcessed')
          : metric.deliveStatus === 'В пути'
            ? type.filter(item=>item.shippingStatus === 'Shipping')
              : metric.deliveStatus === 'Получен'
                && 
                type.filter(item=>item.shippingStatus === 'Delivered')
      || type
    )
  } 

  //sorts list of archive by data
  const filterArchive = async (metric) => {
    dispatch({type: 'LOADING_IS_UNCOMPLETED'});
    await axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(async res=>{
      let dateFiltered = await sortDate(res, metric);
      let typeFiltered = await filterByType(dateFiltered, metric);
      let statusFiltered = await filterByStatus(typeFiltered, metric);
      setList(statusFiltered);
    })
    .catch(err=>console.log(err))
    dispatch({type: 'LOADING_IS_COMPLETED'})
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
            refreshFunction(dispatch, ()=>filterArchive(JSON.parse(localStorage.getItem('filterMetric'))))
          }}>Применить фильтр
        </button>
        <span 
          className='clearFilter'
          onClick={()=>{
            localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }));
            refreshFunction(dispatch, ()=>filterArchive({ date: '', deliveType: '', deliveStatus: '' }));
            window.location.reload();
          }}
        >Очистить фильтрацию</span>
      </div>
    </div>
  )
}