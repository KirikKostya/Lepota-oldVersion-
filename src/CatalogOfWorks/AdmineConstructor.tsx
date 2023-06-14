import React, {useEffect, useState, useRef} from 'react'
import OrderCardMoreImgs from '../Icons/OrderCardMoreImgs';
import SimpleImageSlider from 'react-simple-image-slider';
import VariantPhotosModal from '../Modals/VariantPhotosModal'; 
import CreateVariantModal from '../Admin/CreateVariantModal';
import CreateKitModal from '../Admin/CreateKitModal';
import AddVariantIcon from '../Icons/AddVariantIcon';
import BasketIcon from '../Icons/BasketIcon';
import CrossIcon from '../Icons/CrossIcon';
import Pensil from '../Icons/Pensil';
import { deleteVariant } from '../Admin/AdmineController';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MainFiles/App'
import axios from 'axios';
import './Style/OrderCard.css';
import { IOrderCarsProps, IVariant } from '../Admin/Update/Interfaces/Interface';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { setTotalSum, setVariantId } from '../ReduxToolkit/Slices'


interface IGalleryItem{
  url: string
}
//Makes list from response data
export const getImages = (images:string[]):IGalleryItem[] => {
  return images === null
    ? [{url: require('../Photos/somethingWentWrong.png')}] 
      : images.map(image=>{
          let galleryItem: IGalleryItem = {url: ''};
          galleryItem['url'] = image;
          return galleryItem; 
        }) 
}

const AdmineConstructor: React.FC<IOrderCarsProps> = (props) => {

  const {
    catalogOrders,
    fetchProducts,
    variants,
    setIsOpenUpdateVariant,
    setIsOpenUpdatePhotos
  } = props;

    //Refs
    const refInput = useRef<HTMLInputElement[]>([]);
    const refCount = useRef<HTMLInputElement>(null);

    //context
    const totalSum_TypeComp = useSelector((state: IInitialState)=>state.totalSumInConstuctor);
    const searchOrderById = useSelector((state: IInitialState)=>state.searchOrderById);
    const isAdmine = useSelector((state: IInitialState)=>state.isAdmine);
    const dispatch = useDispatch();

    const [error, setError] = useState<string>('');

    //Opens modal by type
    const [isOpenCreateKitModal, setIsOpenCreateKitModal] = useState<boolean>(false);
    const [isOpenAddedVariantModal, setIsOpenAddedVariantModal] = useState<boolean>(false);
    const [isOpenVarintPhotos, setIsOpenVariantPhotos] = useState<boolean>(false);

    const [imagesOfVariant, setImagesOfVariant] = useState<IGalleryItem[]>(Array);

    const [kits, setKits] = useState<number[]>(Array);
    const [nameOfKit, setNameOfKit] = useState<string>('');
    const [listOfPhotos, setListOfPhotos] = useState<string[]>(Array);

    //For all selected kits
    const [selectedVariants, setSelectedVariants] = useState<IVariant[]>([]);

    //Unchecks all inputs and makes null count of orders
    const cleanSelectedOptions = (refInp:React.MutableRefObject<HTMLInputElement[]>, refCount:React.RefObject<HTMLInputElement>) => {
      for (let i = 0; i < refInp.current.length; i++) {
        refInp.current[i].checked = false;
      }
        dispatch(setTotalSum(JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').price));
        setListOfPhotos(JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')||'{}').icon);
        setNameOfKit('Нет комплекта');
        setKits([]);
    }

    //changes total price, when user ckick on label
    const handlerChangeTotalSum = async (isCheckedLabel: boolean, id: number, item:IVariant) =>{
      if(isCheckedLabel){
        setKits([...kits, id]);
        setSelectedVariants([...selectedVariants, item]);
      } else {
        setKits([...kits.filter(el => el !== id)]);
        setSelectedVariants([...selectedVariants.filter((el:IVariant) => +el.id !== id)]);
      }
    }

    useEffect(()=>fetchProducts(searchOrderById), [catalogOrders]);

  return (
    <>
      {
        catalogOrders.map(order => (
          <div className='mainContainer' key={order.item.id}>
            <div className='containerForCards'>
              <div className='item-Card'> 
                <SimpleImageSlider
                  width={380}
                  height={330}
                  navSize={25}
                  navMargin={0}
                  style={{background: 'transparent'}}
                  navStyle={2}
                  slideDuration={0.7}
                  images={getImages(order.item.icon)}
                  showBullets={false}
                  showNavs={true}
                />
              </div>
            </div>
            <div className='additionalMetrics'>
              <div className={`listOfMitrics ${variants.length===0 && 'empty'}`}>
                <h3 className='headerMetrics'>
                  { isAdmine && <AddVariantIcon onClick={()=>setIsOpenAddedVariantModal(true)} /> }
                  В комплекте может идти:
                </h3>
                <div className='cointainerTC ' >
                  {
                    variants.length === 0 
                      ? <span style={{display: 'block', width: '100%', textAlign: 'center'}}>Нет комбинированных вариантов</span>
                        : variants.sort((a:IVariant, b:IVariant)=>(+a.id)-(+b.id)).map((item, index)=>(
                            <div key={item.id} className='itemOfMetrics' >
                              <label
                                className='metricLabel' 
                                onChange={(event: any)=>{
                                  handlerChangeTotalSum(event.target.value, +item.id, item);
                                }}>
                                  <input ref={(element:HTMLInputElement) => refInput.current[index] = element } type={'checkbox'} className='checkBox' />
                                  <span>+</span>
                                  <p id='variantName'>{item.name} </p>
                                  <p className='item-price'>{item.price} BYN</p>
                              </label>
                              <OrderCardMoreImgs 
                                onClick={()=>{
                                  setIsOpenVariantPhotos(true);
                                  setImagesOfVariant(getImages(item.icon))
                                }} />
                              { 
                                isAdmine 
                                  && 
                                <Pensil 
                                  onClick={async()=>{
                                    dispatch(setVariantId(+item.id));
                                    setIsOpenUpdateVariant(true)
                                  }} 
                                /> 
                              }
                              {
                                isAdmine 
                                && 
                                <CrossIcon onClick={async()=>{
                                  deleteVariant(localStorage.getItem('searchOrderById')||'{}', item.id, dispatch);
                                  fetchProducts(searchOrderById)
                                }}/>
                              }
                            </div>
                          ))
                  }
                </div>
                {
                  kits.length>=2
                  &&
                  <button className='addKitBTN' onClick={()=>setIsOpenCreateKitModal(true)}>Создать набор</button>
                }
                {
                  error && <sup style={{color: 'red'}}>{error}</sup>
                }
              </div>
              {
                catalogOrders.map(order=>(
                  <div className='containerForHeader_Button' key={order.item.id}>
                    <h3 className='headerCard'>
                      {order.item.name} 
                      <span className='nameOfKit'>{''}</span>
                      <span>{totalSum_TypeComp} Br</span>
                      <OrderCardMoreImgs 
                        onClick={()=>{
                          setIsOpenVariantPhotos(true);
                          setImagesOfVariant(getImages(listOfPhotos))
                        }} />
                    </h3>
                  </div>
                ))
              }
              <button className='addToCartBTN' onClick={()=>setIsOpenUpdatePhotos(true)}>Добавить фотографии</button>
            </div>
            <CreateKitModal isOpen={isOpenCreateKitModal} setIsOpen={setIsOpenCreateKitModal} kitVariants={kits} itemId={searchOrderById} selectedVariants={selectedVariants}/>
            <CreateVariantModal isOpen={isOpenAddedVariantModal} setIsOpen={setIsOpenAddedVariantModal} setError={setError} cleanSelectedOptions={()=>cleanSelectedOptions(refInput, refCount)}/>
            <VariantPhotosModal isOpen={isOpenVarintPhotos} setIsOpen={setIsOpenVariantPhotos} IMGS={imagesOfVariant} />
          </div>
        ))
      }
    </>
  )
}

export default AdmineConstructor;