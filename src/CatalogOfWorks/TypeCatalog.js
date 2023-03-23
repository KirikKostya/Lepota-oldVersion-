import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpNavigation from '../Components/UpNavigation';
import LoadingComp from '../Loading/LoadingComp';
import ChangeMetricsModalView from '../Modals/ChangeMetricsModalView';
import OrderCard from './OrderCard';
import ContactWithUs from '../Components/ContactWithUs';
import ReactModal from 'react-modal';
import WarningModalView from '../Modals/WarningModalView';
import { refreshFunction } from '../MailFiles/App'
import { Link } from 'react-scroll';
import axios from 'axios';
import './Style/TypeCatalog.css'


export default function TypeCatalog() {

  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [modalViewStep, setModalViewStep] = useState(1)

  const order = JSON.parse(localStorage.getItem('infoAboutTypeOfOrder'))
  
  //Заказ который есть в корзине, но User хочет поменять метрики 
  const [selectedOrder, setSelectedOrder] = useState(Array);

  //Список товаров по заданному типу
  const [catalogOrders, setCatalogOrders] = useState([]);   

  //ID типа товаров, по которому нужно делать запрос 
  const searchOrderById = useSelector(state=>state.searchOrderById);
  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  const makeArray = (object) => {
    return [object]
  }

  const checkMetric = (value) => {
    return (value) ? '' : 'hide'
  }

  const fetchProducts = (OpenID) => {
    axios.get(`https://api.native-flora.tk/Item/GetById?id=${OpenID || localStorage.getItem('searchOrderById')}`)
      .then(res=>{
        setCatalogOrders([res.data.data]);
        dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: res.data.data.price});
        dispatch({type: 'LOADING_IS_COMPLETED'});
        return res;
      })
  }

  useEffect(()=>{
    fetchProducts(searchOrderById);
    window.scrollTo(0, 0);
  },[])
  
  return (
    <>
      <UpNavigation hide={'hide'}/>
      <div className='infoContainer' id='hideNavBarMainLink'>
        <div className='infoOrder'>
          <h1>Кашпо {order.name}</h1>
          <div className='description_metrics'>
            {
              makeArray(order.sizes).map((item, index)=>(
                <div className='orderMatrics' key={index}>
                  <p className={`mitricItem ${checkMetric(item.Weigth)}`}>Вес: <span>{item.Weigth}</span></p> 
                  <p className={`mitricItem ${checkMetric(item.Width)}`}>Ширина: <span>{item.Width}</span></p>
                  <p className={`mitricItem ${checkMetric(item.Height)}`}>Высота: <span>{item.Height}</span></p>
                  <p className={`mitricItem ${checkMetric(item.Depth)}`}>Глубина: <span>{item.Depth}</span></p>
                  <p className={`mitricItem ${checkMetric(item.Diameter)}`}>Диаметр: <span>{item.Diameter}</span></p>
                  <p className={`mitricItem ${checkMetric(item.Length)}`}>Длина: <span>{item.Length}</span></p>
                  <p className={`mitricItem ${checkMetric(item.Material)}`}>Материал: <span>{item.Material}</span></p>
                </div>
              ))
            }
            <span>{order.description}</span>
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
                                setModalViewStep={setModalViewStep}
                                setSelectedOrder={setSelectedOrder}
                                setAddedOrder={setAddedOrder}
                                setModalView={setModalView}
                              />
                    }

                    {
                      (AddedOrder)
                        ? <ReactModal 
                            isOpen={AddedOrder}
                            ariaHideApp={false}
                            contentLabel="Selected Option"
                          >
                            <h2 className='modal-header'>Ваш товар добавлен в корзину!</h2>
                          </ReactModal>
                          :<></>
                    }

                    {
                      modalView
                        ? <ChangeMetricsModalView 
                            modalView={modalView}
                            setModalView={setModalView}
                            modalViewStep={modalViewStep}
                            setModalViewStep={setModalViewStep}
                            selectedOrder={selectedOrder}
                            />
                          : <></>
                    }
                </>
        }
      </div>
      <ContactWithUs />
    </>
  )
}
