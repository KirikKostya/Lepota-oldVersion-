import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpNavigation from '../Components/UpNavigation';
import LoadingComp from '../Loading/LoadingComp';
import OrderCard from './OrderCard';
import ContactWithUs from '../Components/ContactWithUs';
import ReactModal from 'react-modal';
import WarningModalView from '../Modals/WarningModalView';
import Pensil from '../Icons/Pensil';
import { updateDescription, updateMetric, updateName } from '../Admin/AdmineController';
import { refreshFunction } from '../MailFiles/App'
import { Link } from 'react-scroll';
import axios from 'axios';
import './Style/TypeCatalog.css'
import UpdateModalView from '../Admin/UpdateModalView';


export default function TypeCatalog() {

  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [updateModalViewType, setUpdateModalViewType] = useState('')

  const order = JSON.parse(localStorage.getItem('infoAboutTypeOfOrder'))

  //Список товаров по заданному типу
  const [catalogOrders, setCatalogOrders] = useState([]);   

  //ID типа товаров, по которому нужно делать запрос 
  const searchOrderById = useSelector(state=>state.searchOrderById);
  const isLoading = useSelector(state=>state.isLoading);
  const isAdmin = useSelector(state=>state.isAdmin)
  const dispatch = useDispatch();

  const makeArray = (object) => {
    return [object]
  }

  const checkMetric = (value) => {
    return (value) ? '' : 'hide'
  }

  //fetching product by id
  const fetchProducts = (OpenID) => {
    axios.get(`https://api.native-flora.tk/Item/GetById?id=${OpenID || localStorage.getItem('searchOrderById')}`)
      .then(res=>{
        setCatalogOrders([res.data.data]);
        dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: res.data.data.item.price});
        dispatch({type: 'LOADING_IS_COMPLETED'});
        return res;
      })
  }

  useEffect(()=>{
    refreshFunction(dispatch, ()=>fetchProducts(searchOrderById))
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
      <UpNavigation hide={'hide'}/>
      <div className='infoContainer' id='hideNavBarMainLink'>
        <div className='infoOrder'>
          <h1>Кашпо {order.name} { isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('name')}/> } </h1>
          <div className='description_metrics'>
            {
              makeArray(order.sizes).map((item, index)=>(
                <div className='orderMatrics' key={index}>
                  <p className={`metricItem ${checkMetric(item.Material)}`}>
                    Материал: <span>
                                {item.Material}
                              </span>
                        <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Material')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Width)}`}>
                    Ширина: <span>
                              {item.Width}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Width')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Height)}`}>
                    Высота: <span>
                              {item.Height}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Height')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Depth)}`}>
                    Глубина: <span>
                              {item.Depth}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Depth')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Length)}`}>
                    Длина: <span>
                              {item.Length}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Length')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Diameter)}`}>
                    Диаметр: <span>
                              {item.Diameter}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Diameter')}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Weigth)}`}>
                    Вес: <span>
                              {item.Weigth}
                            </span>
                      <sup>{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('metric Weigth')}/> }</sup>
                  </p> 
                </div>
              ))
            }
            <span>{order.description.join('. ')}{ isAdmin && <Pensil setUpdateModalViewType={()=>setUpdateModalViewType('description')}/> }</span>
          </div>
          <p className='forOrderMakes'>Для заказа: 
            <span> заполните форму в корзине заказов и отправьте Ваш оформленный заказ нам. 
                  <br/>Если есть вопросы, вы можете связаться с нами любым способом представленном в
                <Link activeClass="active" 
                  to="ContactWithUs" 
                  spy={true} 
                  smooth={true} 
                  offset={-50} 
                  duration={500}
                  onClick={()=>{ refreshFunction(dispatch) }}
                  className={`NavLink item-contact`}>СВЯЗАТЬСЯ С НАМИ.</Link>
            </span>
          </p>
        </div>
      </div>

      <UpdateModalView 
        type={updateModalViewType} 
        setUpdateModalViewType={setUpdateModalViewType}
        allDataOfOrder={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder'))}
        refreshFunction={()=>refreshFunction(dispatch, ()=>fetchProducts(searchOrderById))}
        updateFunc={
          updateModalViewType === 'name' 
            ? updateName 
              : updateModalViewType === 'description' 
                ? updateDescription 
                  : updateModalViewType.includes('metric') 
                    ? updateMetric 
                      : ''
        }
      />

      <div className='containerForTypeCatalog'>
        {
          WarningMessageIsOpen
              ? <WarningModalView WarningMessageIsOpen={WarningMessageIsOpen}/>
                :<>
                    {
                      isLoading
                        ? <div className='loadingField'> 
                            <LoadingComp />
                          </div>
                          : 
                            <OrderCard 
                                catalogOrders={catalogOrders}
                                setWarningMessageIsOpen={setWarningMessageIsOpen}
                                setAddedOrder={setAddedOrder}
                                setModalView={setModalView}
                              />
                    }

                    {
                      AddedOrder
                        ? <ReactModal 
                            isOpen={AddedOrder}
                            ariaHideApp={false}
                            contentLabel="Selected Option"
                          >
                            <h2 className='modal-header'>Ваш товар добавлен в корзину!</h2>
                          </ReactModal>
                          : modalView
                            ? <ReactModal 
                                isOpen={modalView}
                                ariaHideApp={false}
                                contentLabel="Selected Option"
                              >
                                <h2 className='modal-header'>Такой товар уже есть в корзине</h2>
                                <p>Изменить количество товаров можно в корзине</p>
                              </ReactModal>
                               :<></>
                    }
                </>
        }
      </div>
      <ContactWithUs />
    </>
  )
}
