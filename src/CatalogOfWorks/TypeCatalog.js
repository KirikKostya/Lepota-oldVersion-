import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import WarningModalView from '../Modals/WarningModalView';
import UpNavigation from '../Components/UpNavigation';
import ContactWithUs from '../Components/ContactWithUs';
import OrderCard from './OrderCard';
import Pensil from '../Icons/Pensil';
import Picker from '../Admin/Picker';
import { getUnit, updateDescription, updateMetric, updateName, updateVariant } from '../Admin/AdmineController';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import { Link } from 'react-scroll';
import axios from 'axios';
import './Style/TypeCatalog.css'
import CameraIcon from '../Icons/CameraIcon';
import UpdatePhotos from '../Admin/Update/UpdatePhotos';
import UpdateName from '../Admin/Update/UpdateName';
import UpdateDescription from '../Admin/Update/UpdateDescription';
import UpdateMetric from '../Admin/Update/UpdateMetric';
import UpdateVariant from '../Admin/Update/UpdateVariant';


export default function TypeCatalog() {

  const [warningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [addedOrder, setAddedOrder] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [updateModalViewType, onClick] = useState('');
  
  const [photosOfCards, setPhotosOfCards] = useState([]);
  
  //opens modal states
  const [isOpenUpdatePhotos, setIsOpenUpdatePhotos] = useState(false);
  const [isOpenUpdateName, setIsOpenUpdateName] = useState(false);
  const [isOpenUpdateDescription, setIsOpenUpdateDescription] = useState(false);
  const [isOpenUpdateMetric, setIsOpenUpdateMetric] = useState({});
  const [isOpenUpdateVariant, setIsOpenUpdateVariant] = useState(false);

  const order = JSON.parse(localStorage.getItem('infoAboutTypeOfOrder'));

  //Список товаров по заданному типу
  const [catalogOrders, setCatalogOrders] = useState([]);   

  //ID типа товаров, по которому нужно делать запрос 
  const searchOrderById = useSelector(state=>state.searchOrderById);
  const variantId = useSelector(state=>state.variantId);
  const isAdmin = useSelector(state=>state.isAdmin);
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
        setPhotosOfCards(res.data.data.item.icon);
        localStorage.setItem('variants', JSON.stringify(res.data.data.variants));
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
          <h1 onClick={()=>console.log(photosOfCards)}>
            Кашпо {order.name} 
            { 
              isAdmin 
              && 
              <span className='addIcons'>
                <Pensil onClick={()=>setIsOpenUpdateName(true)}/>
                <CameraIcon onClick={()=>setIsOpenUpdatePhotos(true)}/>
              </span>
            }
          </h1>
          <div className='descriptionMetrics'>
            {
              makeArray(order.sizes).map((item, index)=>(
                <div className='orderMatrics' key={index}>
                  <p className={`metricItem ${checkMetric(item.Material)}`}>
                    Материал: <span>
                                {`${item.Material} ${getUnit('Material')}`}
                              </span>
                        <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Material'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Width)}`}>
                    Ширина: <span>
                              {`${item.Width} ${getUnit('Width')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Width'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Height)}`}>
                    Высота: <span>
                              {`${item.Height} ${getUnit('Height')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Height'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Depth)}`}>
                    Глубина: <span>
                              {`${item.Depth} ${getUnit('Depth')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Depth'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Length)}`}>
                    Длина: <span>
                              {`${item.Length} ${getUnit('Length')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Length'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Diameter)}`}>
                    Диаметр: <span>
                              {`${item.Diameter} ${getUnit('Diameter')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Diameter'})}/> }</sup>
                  </p>
                  <p className={`metricItem ${checkMetric(item.Weight)}`}>
                    Вес: <span>
                              {`${item.Weight} ${getUnit('Weight')}`}
                            </span>
                      <sup>{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Weight'})}/> }</sup>
                  </p> 
                </div>
              ))
            }
            <span>{order.description}{ isAdmin && <Pensil onClick={()=>setIsOpenUpdateDescription(true)}/> }</span>
          </div>
          <p className='forOrderMakes'>Для заказа: 
            <span> заполните форму в корзине заказов и отправьте Ваш оформленный заказ нам. 
                  <br/>Если есть вопросы, вы можете связаться с нами любым способом представленном в
                <Link activeClass="active" 
                  to="contactWithUs" 
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
      {
        isAdmin
        &&
        <>
          <UpdatePhotos isOpen={isOpenUpdatePhotos} photos={photosOfCards} setIsOpen={setIsOpenUpdatePhotos} />
          <UpdateName isOpen={isOpenUpdateName} defaultName={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).name} setIsOpen={setIsOpenUpdateName} />
          <UpdateDescription isOpen={isOpenUpdateDescription} defaultDescription={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).description} setIsOpen={setIsOpenUpdateDescription} />
          <UpdateMetric isOpen={isOpenUpdateMetric.isOpen} metricKey={isOpenUpdateMetric.value} defaultMetricValue={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).sizes[isOpenUpdateMetric.value]} setIsOpen={setIsOpenUpdateMetric} />
        </>
      }
      {
        localStorage.getItem('variants') && isAdmin
        &&
        <UpdateVariant isOpen={isOpenUpdateVariant} variant={JSON.parse(localStorage.getItem('variants')).filter(el=>el.id == variantId)[0]} setIsOpen={setIsOpenUpdateVariant} />
      }
      {/* {
        localStorage.getItem('variants') && isAdmin
        &&
        <UpdateModalView 
          type={updateModalViewType} 
          onClick={onClick}
          allDataOfOrder={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder'))}
          refreshFunction={()=>refreshFunction(dispatch, ()=>fetchProducts(searchOrderById))}
          updateFunc={
            updateModalViewType === 'name' 
              ? updateName 
                : updateModalViewType === 'description' 
                  ? updateDescription 
                    : updateModalViewType.includes('metric') 
                      ? updateMetric 
                        : updateModalViewType === 'variant'
                          ? updateVariant
                            : ''
          }
        />
      } */}
      <div className='containerForTypeCatalog'>
        {
          warningMessageIsOpen
              ? <WarningModalView warningMessageIsOpen={warningMessageIsOpen}/>
                :<>
                    <OrderCard 
                      setCatalogOrders={setCatalogOrders}
                      catalogOrders={catalogOrders}
                      setWarningMessageIsOpen={setWarningMessageIsOpen}
                      setAddedOrder={setAddedOrder}
                      setModalView={setModalView}
                      onClick={onClick}
                      fetchProducts={fetchProducts}
                      variants={JSON.parse(localStorage.getItem('variants'))}

                      setIsOpenUpdateVariant={setIsOpenUpdateVariant}
                    />
                    {
                      addedOrder
                        ? <ReactModal 
                            isOpen={addedOrder}
                            ariaHideApp={false}
                            contentLabel="Selected Option"
                          >
                            <h2 className='modal-header'>Ваш товар добавлен в корзину!</h2>
                          </ReactModal>
                          : modalView
                            &&
                            <ReactModal 
                              isOpen={modalView}
                              ariaHideApp={false}
                              contentLabel="Selected Option"
                            >
                              <h2 className='modal-header'>Такой товар уже есть в корзине</h2>
                              <p>Изменить количество товаров можно в корзине</p>
                            </ReactModal>
                    }
                </>
        }
      </div>
      <ContactWithUs />
    </>
  )
}
