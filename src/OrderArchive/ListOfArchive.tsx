import React, { useState } from 'react';
import WarningIcon from '../Icons/WarningIcon';
import { SortByDate, SortByDileverStatus, SortByDileverType } from '../MainFiles/OptionList';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';
import { IOrderArchiveType } from '../Admin/Update/Interfaces/Interface';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { Empty, Select } from 'antd';
import axios from 'axios';
import './Styles/OrdersArchive.css';

interface IListOfArchiveProps{
  LIST: IOrderArchiveType[], 
  setList: (data: IOrderArchiveType[])=>void
}
interface IFilterData{
  date: string,
  deliveType: string, 
  deliveStatus: string
}

const ListOfArchive: React.FC<IListOfArchiveProps> = (props) => {

  const { LIST, setList } = props;

  const [date, setDate] = useState<string|null>(null);
  const [deliveryType, setDeliveryType] = useState<string|null>(null);
  const [takeStatus, setTakeStatus] = useState<string|null>(null);

  const isLoading = useSelector((state:IInitialState)=>state.isLoading);
  const dispatch = useDispatch();

  //sorts data by date
  const sortDate= (res:IOrderArchiveType[], metric:IFilterData):IOrderArchiveType[] => {
    return(
      metric.date
      &&
      metric.date === 'Новые'
          ? res.sort((a:IOrderArchiveType, b:IOrderArchiveType) => b.id - a.id)
            : res.sort((a:IOrderArchiveType, b:IOrderArchiveType) => a.id - b.id)
      || res
    )
  }

  //sorts data by type of delivering
  const filterByType = (data:IOrderArchiveType[], metric:IFilterData):IOrderArchiveType[] => {
    if(metric.deliveType){
      return(
        metric.deliveType === 'Доставка'
          ? data.filter((item:IOrderArchiveType)=>item.shipping === true)
            : data.filter((item:IOrderArchiveType)=>item.shipping === false)
      )
    } 
    return data
  } 

  //sorts data by status of delivering
  const filterByStatus = (type:IOrderArchiveType[], metric:IFilterData):IOrderArchiveType[] => {
    return(
      metric.deliveStatus
      &&
      metric.deliveStatus === 'Принят в обработку'
        ? type.filter((item:IOrderArchiveType)=>item.shippingStatus === 'BeingProcessed')
          : metric.deliveStatus === 'В пути'
            ? type.filter((item:IOrderArchiveType)=>item.shippingStatus === 'Shipping')
              : metric.deliveStatus === 'Получен'
                && 
                type.filter((item:IOrderArchiveType)=>item.shippingStatus === 'Delivered')
      || type
    )
  } 

  //sorts list of archive by data
  const filterArchive = async (metric:IFilterData) => {
    dispatch(loadingUncomplate());
    await axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(async (res)=>{
      let dateFiltered = await sortDate(res.data.data, metric);
      let typeFiltered = await filterByType(dateFiltered, metric);
      let statusFiltered = await filterByStatus(typeFiltered, metric);
      setList(statusFiltered);
    })
    .catch(err=>console.log(err))
    dispatch(loadingComplate())
  } 

  //on page writting status of delivering
  const checkedStatusOfDelivering = (param:string):string => {
    return param == 'BeingProcessed'
            ? 'Принят в обработку'
              : param == 'Shipping'
                ? 'В пути'
                  : param == 'Delivered'
                    ? 'Доставлен'
                      : 'Не определено'
  }

  //makes Styles For Status Of Delivering
  const creatingStyles = (param:string) => {
    return param == 'BeingProcessed'
            ? {color: '#61aeff'}
              : param == 'Shipping'
                ? {color: '#eb0c0c'}
                  : param == 'Delivered'
                    ? {calor: '#00BB40'}
                      : {color: 'black'}
  }

  const selectHandlerChange = (value: string, setValue: React.Dispatch<React.SetStateAction<string|null>>): void =>{
    setValue(value);
    (value === 'Новые')
      ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), date: 'Новые'}))
        : (value === 'Старые') 
          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), date: 'Старые'}))
            : (value === 'Доставка')
              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveType: 'Доставка'}))
                : (value === 'Самовывоз')
                  ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveType: 'Самовывоз'}))
                    : (value === 'Получен')
                      ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'Получен'}))
                        : (value === 'В пути')
                          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'В пути'}))
                            : (value === 'Принят в обработку') 
                              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'Принят в обработку'}))
                                : localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}')}))
  }

  const cleanAllSelect = (): void => {
    setDate(null);
    setDeliveryType(null);
    setTakeStatus(null);
  }

  return (
    <div className='mainContainerForArhive' id='hideNavBarMainLink'>
      {
        isLoading 
          ? <div className='mainListContainer'></div>
            : LIST.length === 0
                ? <div className='emptyArchive'>
                    <Empty description={<h4><WarningIcon margin='0 5px'/> Ваш архив пуст</h4>} >
                      Добавить заказ можно<NavLink to={'/MyBasket'}> в корзине </NavLink> !
                    </Empty>
                  </div>
                  : <div className='mainListContainer'>
                      {
                        LIST.map((el, index)=>(
                          <div className='listContainer' key={index}>
                            <div className={'archiveCheck'}>
                              <div className='date_numberOrder'>
                                <p>Заказ #<span>{el.id}</span></p>
                                {
                                  [el.fullDate].map((fullDate, index)=>(
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
        <Select value={date} onChange={(value: string)=>selectHandlerChange(value, setDate)} placeholder={'Сортировка по дате'} options={SortByDate} style={{width: '70%', margin: '5px 0'}} listItemHeight={20} listHeight={300}/>
        <Select value={deliveryType} onChange={(value: string)=>selectHandlerChange(value, setDeliveryType)} placeholder={'Тип доставки'} options={SortByDileverType} style={{width: '70%', margin: '5px 0'}} listItemHeight={20} listHeight={300}/>
        <Select value={takeStatus} onChange={(value: string)=>selectHandlerChange(value, setTakeStatus)} placeholder={'Статус получения'} options={SortByDileverStatus} style={{width: '70%', margin: '5px 0'}} listItemHeight={20} listHeight={300}/>
        <button 
          className='sortBTN' 
          onClick={() => {
            refreshFunction(dispatch, ()=>filterArchive(JSON.parse(localStorage.getItem('filterMetric')!)))
          }}>Применить фильтр
        </button>
        <span 
          className='clearFilter'
          onClick={()=>{
            localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }));
            refreshFunction(dispatch, ()=>filterArchive({ date: '', deliveType: '', deliveStatus: '' }));
            cleanAllSelect()
          }}
        >Очистить фильтрацию</span>
      </div>
    </div>
  )
}

export default ListOfArchive;