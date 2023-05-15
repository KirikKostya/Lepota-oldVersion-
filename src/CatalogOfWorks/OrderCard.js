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
import { refreshFunction } from '../MailFiles/App'
import axios from 'axios';
import './Style/OrderCard.css';


export default function OrderCard(
  {
    catalogOrders,
    setWarningMessageIsOpen,
    setAddedOrder,
    setModalView,
    setUpdateModalViewType,
    fetchProducts,
    variants
  }
) {

    //Refs
    const refInput = useRef([]);
    const refCount = useRef(null);

    const totalSum_TypeComp = useSelector(state=>state.totalSum_TypeComp);
    const searchOrderById = useSelector(state=>state.searchOrderById);
    const isAdmin = useSelector(state=>state.isAdmin);
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    //Opens modal by type
    const [isOpenCreateKitModal, setIsOpenCreateKitModal] = useState(false);
    const [isOpenAddedVariantModal, setIsOpenAddedVariantModal] = useState(false);
    const [isOpenVarintPhotos, setIsOpenVariantPhotos] = useState(false);

    const [imagesOfVariant, setImagesOfVariant] = useState(Array);

    const [amountOfOrder, setAmountOfOrder] = useState(1)
    const [kits, setKits] = useState(Array);
    const [nameOfKit, setNameOfKit] = useState('');
    const [listOfPhotos, setListOfPhotos] = useState(Array);

    //For all selected kits
    const [selectedVariants, setSelectedVariants] = useState([]);

    //Adds item to cart of order
    const addItemToCart = async (cardId) =>{
      axios.post(`https://api.native-flora.tk/Cart/Add`, {
        id: cardId,
        amount: amountOfOrder,
        variants: kits.length != 0 
                    ? kits 
                      : null
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
      .then(res => {
        if(res.status === 200){
          setAddedOrder(true)
          setTimeout(()=>setAddedOrder(false), 2000)
          cleanSelectedOptions(refInput, refCount)
        }
      })
      .catch(err => {
        if(err.response.status === 404){
          setModalView(true)
          setTimeout(()=>setModalView(false), 3000)
        }
      })
    }

    //Unchecks all inputs and makes null count of orders
    const cleanSelectedOptions = (refInp, refCount) => {
      for (let i = 0; i < refInp.current.length; i++) {
        refInp.current[i].checked = false;
      }
        dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).price })
        setListOfPhotos(getImages(JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).icon))
        refCount.current.value = 1;
        setNameOfKit('Нет комплекта')
        setKits([])
    }

    //Makes list from response data
    const getImages = (images) => {
      return images === null
        ? [{
            url: require('../Photos/somethingWentWrong.png')
          }] 
          : images.map(image=>{
              let galleryItem = {};
              galleryItem['url'] = image;
              return galleryItem; 
            }) 
    }

    //changes total price, when user ckick on label
    const handlerChangeTotalSum = async (isCheckedLabel, id, item) =>{
      if(isCheckedLabel){
        setKits([...kits, id]);
        setSelectedVariants([...selectedVariants, item]);
      } else {
        setKits([...kits.filter(el => el !== id)]);
        setSelectedVariants([...selectedVariants.filter(el => el.id !== id)]);
      }
    }

    //checks length of selected items and makes correct result
    useEffect(()=>{
      if(kits.length > 1){
        catalogOrders[0].kits.forEach(kit=>{
          if(JSON.stringify(kit.variants) === JSON.stringify(kits.sort((a, b) => a - b ))){
            dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: kit.price});
            setListOfPhotos(kit.icon);
            setNameOfKit(kit.name);
            console.log(kit)
          }
        })
      } else if(kits.length === 1){
        catalogOrders[0].variants.forEach(example=>{
          if(example.id === kits[0]){
            dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: example.price});
            setListOfPhotos(example.icon)
            setNameOfKit(example.name);
          }
        })
      } else {
          dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).price})
          setListOfPhotos(JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).icon)
          setNameOfKit('Нет комплекта')
      }
    }, [kits])

    useEffect(()=>fetchProducts(searchOrderById), [catalogOrders]);

  return (
    catalogOrders.map(order =>(
      <div className='mainContainer' key={order}>
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
              showNavs={true} />
          </div>
        </div>
        <div className='additionalMetrics'>
          <div className={`listOfMitrics ${variants.length===0 && 'empty'}`}>
            <h3 className='headerMetrics'>
              { isAdmin && <AddVariantIcon onClick={()=>setIsOpenAddedVariantModal(true)}/> }
              В комплекте может идти:
            </h3>
            <div className='cointainerTC ' >
              {
                variants.length === 0 
                  ? <span style={{display: 'block', width: '100%', textAlign: 'center'}}>Нет комбинированных вариантов</span>
                    : variants.sort((a, b)=>a.id-b.id).map((item, index)=>(
                        <div key={item.id} className='itemOfMetrics' >
                          <label
                            className='metricLabel' 
                            onChange={async (e)=>{
                              handlerChangeTotalSum(e.target.checked, item.id, item);
                            }}>
                              <input ref={(element) => { refInput.current[index] = element }} type={'checkbox'} className='checkBox' />
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
                            isAdmin 
                              && 
                            <Pensil 
                              setUpdateModalViewType={async()=>{
                                dispatch({type: 'SET_VARIANT_ID', payload: item.id});
                                await setUpdateModalViewType('variant')
                              }} 
                            /> 
                          }
                          {
                            isAdmin 
                            && 
                            <CrossIcon onClick={async()=>{
                              deleteVariant(localStorage.getItem('searchOrderById'), item.id, dispatch);
                              await fetchProducts(searchOrderById)
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
              <div className='containerForHeader_Button' key={order}>
                <h3 className='headerCard'>
                  {order.item.name} 
                  <span className='nameOfKit' onClick={()=>setUpdateModalViewType('variant')}>{`( ${nameOfKit} )`}</span>
                  <input 
                    ref={refCount}
                    type={'number'} 
                    className='amountInput'
                    onChange={(e)=> setAmountOfOrder(e.target.value)}
                    defaultValue={amountOfOrder}
                    min={0}
                  />
                  <span>{totalSum_TypeComp} Br</span>
                  <OrderCardMoreImgs 
                    onClick={()=>{
                      setIsOpenVariantPhotos(true);
                      setImagesOfVariant(getImages(listOfPhotos))
                    }} />
                </h3>
                <button className={`addToCartBTN ${amountOfOrder === '0' ? 'disabled' : ''}`}
                        disabled={amountOfOrder === '0'}
                        onClick={async ()=>{
                          localStorage.getItem('accessToken')
                            ? addItemToCart(order.item.id)
                              : setWarningMessageIsOpen(true)
                          refreshFunction(dispatch) //Fetch to refresh Token
                        }}
                  >
                    В корзину
                  <BasketIcon />     
                </button>
              </div>
            ))
          }
        </div>
        <CreateKitModal isOpen={isOpenCreateKitModal} setIsOpen={setIsOpenCreateKitModal} kitVariants={kits} itemId={searchOrderById} selectedVariants={selectedVariants}/>
        <CreateVariantModal isOpen={isOpenAddedVariantModal} setIsOpen={setIsOpenAddedVariantModal} setError={setError} cleanSelectedOptions={()=>cleanSelectedOptions(refInput, refCount)}/>
        <VariantPhotosModal isOpen={isOpenVarintPhotos} setIsOpen={setIsOpenVariantPhotos} IMGS={imagesOfVariant} />
      </div>
      ))
  )
}
