import React, { useState, useEffect } from 'react';
import Pensil from '../Icons/Pensil';
import { ICard, IItemOfWork, IOpenUpdateMetric, IVariant } from '../Admin/Update/Interfaces/Interface';
import { loadingComplate, setTotalSum } from '../ReduxToolkit/Slices';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getUnit } from '../Admin/AdmineController';
import { refreshFunction } from '../MainFiles/App';
import { Link } from 'react-scroll';
import FullCombinationOfItemById from './FullCombinationOfItemById';
import UpdateDescription from '../Admin/Update/UpdateDescription';
import UpdateVariant from '../Admin/Update/UpdateVariant';
import ContactWithUs from '../Components/ContactWithUs';
import UpdatePhotos from '../Admin/Update/UpdatePhotos';
import UpdateMetric from '../Admin/Update/UpdateMetric';
import UpNavigation from '../Components/UpNavigation';
import AdmineConstructor from './AdmineConstructor';
import UpdateName from '../Admin/Update/UpdateName';
import axios from 'axios';
import './Style/TypeCatalog.css'


const TypeCatalog: React.FC = () => {
  
  const [photosOfCards, setPhotosOfCards] = useState<string[]>([]);
  
  //opens modal states
  const [isOpenUpdatePhotos, setIsOpenUpdatePhotos] = useState<boolean>(false);
  const [isOpenUpdateName, setIsOpenUpdateName] = useState<boolean>(false);
  const [isOpenUpdateDescription, setIsOpenUpdateDescription] = useState<boolean>(false);
  const [isOpenUpdateMetric, setIsOpenUpdateMetric] = useState<IOpenUpdateMetric>({isOpen: false, value: ''});
  const [isOpenUpdateVariant, setIsOpenUpdateVariant] = useState<boolean>(false);

  const order: ICard = JSON.parse(localStorage.getItem('infoAboutTypeOfOrder') || '{}');

  //Список товаров по заданному типу
  const [catalogOrders, setCatalogOrders] = useState<IItemOfWork[]>([]);   

  //ID типа товаров, по которому нужно делать запрос 
  const searchOrderById = useSelector((state: IInitialState)=>state.searchOrderById);
  const variantId = useSelector((state: IInitialState)=>state.variantId);
  const isAdmine = useSelector((state: IInitialState)=>state.isAdmine);
  const dispatch = useDispatch();

  const checkMetric = (value:string):string => {
    return (value) ? '' : 'hide'
  }

  //fetching product by id
  const fetchProducts = (OpenID:number) => {
    axios.get(`https://api.native-flora.tk/Item/GetById?id=${OpenID || localStorage.getItem('searchOrderById')}`)
      .then(res=>{
        setCatalogOrders([res.data.data]);
        setPhotosOfCards(res.data.data.item!.icon);
        isAdmine && localStorage.setItem('variants', JSON.stringify(res.data.data.variants));
        dispatch(setTotalSum(res.data.data.item!.price));
        dispatch(loadingComplate());
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
          <h1>
            Кашпо {order.name} 
            { 
              isAdmine 
              && 
              <span className='addIcons'>
                <Pensil onClick={()=>setIsOpenUpdateName(true)}/>
              </span>
            }
          </h1>
          <div className='descriptionMetrics'>
            {
              [order.sizes].length === 0 
                ? <span>No sizes !</span>
                  :
                    [order.sizes].map((item, index)=>(
                      <div className='orderMatrics' key={index}>
                        <p className={`metricItem ${checkMetric(item!.Material)}`}>
                          Материал: <span>
                                      {`${item!.Material} ${getUnit('Material')}`}
                                    </span>
                              <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Material'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Width)}`}>
                          Ширина: <span>
                                    {`${item!.Width} ${getUnit('Width')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Width'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Height)}`}>
                          Высота: <span>
                                    {`${item!.Height} ${getUnit('Height')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Height'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Depth)}`}>
                          Глубина: <span>
                                    {`${item!.Depth} ${getUnit('Depth')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Depth'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Length)}`}>
                          Длина: <span>
                                    {`${item!.Length} ${getUnit('Length')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Length'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Diameter)}`}>
                          Диаметр: <span>
                                    {`${item!.Diameter} ${getUnit('Diameter')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Diameter'})}/> }</sup>
                        </p>
                        <p className={`metricItem ${checkMetric(item!.Weight)}`}>
                          Вес: <span>
                                    {`${item!.Weight} ${getUnit('Weight')}`}
                                  </span>
                            <sup>{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateMetric({isOpen: true, value: 'Weight'})}/> }</sup>
                        </p> 
                      </div>
                    ))
            }
          <span>{order.description}{ isAdmine && <Pensil onClick={()=>setIsOpenUpdateDescription(true)}/> }</span>
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
                  onClick={()=>{ refreshFunction(dispatch, ()=>{}) }}
                  className={`NavLink item-contact`}>СВЯЗАТЬСЯ С НАМИ.</Link>
            </span>
          </p>
        </div>
      </div>
      {
        isAdmine
        &&
        <>
          <UpdatePhotos isOpen={isOpenUpdatePhotos} photos={photosOfCards} setIsOpen={setIsOpenUpdatePhotos} />
          <UpdateName isOpen={isOpenUpdateName} defaultName={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').name} defaultPrice={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').price} setIsOpen={setIsOpenUpdateName} />
          <UpdateDescription isOpen={isOpenUpdateDescription} defaultDescription={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').description} setIsOpen={setIsOpenUpdateDescription} />
          <UpdateMetric isOpen={isOpenUpdateMetric.isOpen} metricKey={isOpenUpdateMetric.value} defaultMetricValue={JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').sizes[isOpenUpdateMetric.value]} setIsOpen={setIsOpenUpdateMetric} />
        </>
      }
      {
        JSON.parse(localStorage.getItem('variants') || '[]').length != 0
        && 
        <UpdateVariant isOpen={isOpenUpdateVariant} variant={JSON.parse(localStorage.getItem('variants')||'{}').filter((el:IVariant)=>+el.id == variantId)[0]} setIsOpen={setIsOpenUpdateVariant} />
      }
      {
        isAdmine
          ? 
            <div className='containerForTypeCatalog'>
              <AdmineConstructor 
                catalogOrders={catalogOrders}
                fetchProducts={fetchProducts}
                variants={JSON.parse(localStorage.getItem('variants')||'[]')}
                setIsOpenUpdateVariant={setIsOpenUpdateVariant}
                setIsOpenUpdatePhotos={setIsOpenUpdatePhotos}
              />
            </div>
            : <FullCombinationOfItemById id={localStorage.getItem('searchOrderById') || ''}/>
      }
      <ContactWithUs />
    </>
  )
}

export default TypeCatalog;