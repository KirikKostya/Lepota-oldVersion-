import React, { useState, useEffect } from 'react'
import ContactWithUs from '../Components/ContactWithUs';
import LoadingComp from './LoadingComp';
import ChangeMetricsModalView from './ChangeMetricsModalView';
import OrderCard from './OrderCard';
import UpNavigation from '../Components/UpNavigation';
import WarningModalView from './WarningModalView';
import ReactModal from 'react-modal';
import './Style/TypeCatalog.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-scroll';
import { refreshFunction } from '../App'


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

  const breakDescription = (Text) => {
    console.log(Text.split('.'))
  }

  const fetchProducts = (OpenID) => {
    axios.get(`https://api.native-flora.tk/Item/GetById?id=${ OpenID || localStorage.getItem('searchOrderById') }`)
      .then(res=>{
        setCatalogOrders([res.data.data]);
        dispatch({type: 'LOADING_IS_COMPLETED'});
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
                  <p className={`mitricItem ${item.Weigth ||'hide'}`}>Вес: <span>{item.Weigth}</span></p> 
                  <p className={`mitricItem ${item.Width ||'hide'}`}>Ширина: <span>{item.Width}</span></p>
                  <p className={`mitricItem ${item.Height ||'hide'}`}>Высота: <span>{item.Height}</span></p>
                  <p className={`mitricItem ${item.Depth ||'hide'}`}>Глубина: <span>{item.Depth}</span></p>
                  <p className={`mitricItem ${item.Diameter ||'hide'}`}>Диаметр: <span>{item.Diameter}</span></p>
                  <p className={`mitricItem ${item.Length ||'hide'}`}>Длина: <span>{item.Length}</span></p>
                  <p className={`mitricItem ${item.Material ||'hide'}`}>Материал: <span>{item.Material}</span></p>
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
                  onClick={refreshFunction}
                  className={`NavLink item-contact`}>СВЯЗАТЬСЯ С НАМИ.</Link>
            </span>
          </p>
        </div>
      </div>
      <div className='ContainerForTypeCatalog'>
        {
          WarningMessageIsOpen
              ? <WarningModalView WarningMessageIsOpen={WarningMessageIsOpen}/>
                :<>
                  <div className='ContainerForCards' >
                    {
                      isLoading
                        ? <LoadingComp />
                          : <OrderCard 
                              catalogOrders={catalogOrders}
                              setWarningMessageIsOpen={setWarningMessageIsOpen}
                              setModalViewStep={setModalViewStep}
                              setSelectedOrder={setSelectedOrder}
                              setAddedOrder={setAddedOrder}
                              setModalView={setModalView}
                              />
                    }
                  </div>
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
