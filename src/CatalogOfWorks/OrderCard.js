import React, {useEffect, useState, useRef} from 'react'
import errorPicture from '../Photos/somethingWentWrong.png'
import AddedVariantModal from '../Modals/AddedVariantModal'; 
import SimpleImageSlider from 'react-simple-image-slider';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import axios from 'axios';
import './Style/OrderCard.css'


export default function OrderCard(
  {
    catalogOrders,
    setWarningMessageIsOpen,
    setSelectedOrder,
    setAddedOrder,
    setModalView
  }
) {

    //Refs
    const refInput = useRef([]);
    const refCount = useRef(null);

    const totalSum_TypeComp = useSelector(state=>state.totalSum_TypeComp);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [imagesOfVariant, setImagesOfVariant] = useState(Array);

    const [amountOfOrder, setAmountOfOrder] = useState(1)
    const [kits, setKits] = useState(Array);
    const [nameOfKit, setNameOfKit] = useState('');
    const [listOfPhotos, setListOfPhotos] = useState(Array);


    //Make List of sort selected orders 
    const fetchOrderById = (ID) => {
      axios.post( 'https://api.native-flora.tk/Cart/All', {}, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}
      })
      .then(res=>{
        if(res.data.data){          
          setSelectedOrder(res.data.data.cartItems.filter(item=>item === ID))
        }
      }) 
    }

    //Added item to cart of order
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
    const cleanSelectedOptions = (refInp, refCount, toNull) => {
      for (let i = 0; i < refInp.current.length; i++) {
        refInp.current[i].checked = false;
      }
        dispatch({type: 'SET_TOTAL_SUM_TYPE-COMP', payload: JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).price })
        setListOfPhotos(getImages(JSON.parse(localStorage.getItem('infoAboutTypeOfOrder')).icon))
        refCount.current.value = 1;
        setNameOfKit('Нет комплекта')
    }

    //Make list from response data
    const getImages = (images) => {
      return images.map(image=>{
        let galleryItem = {};
        galleryItem['url'] = image;
        return galleryItem; 
      }); 
    }

    //changes total price, when user ckick on label
    const handlerChangeTotalSum = async (isCheckedLabel, id) =>{
        if(isCheckedLabel){
          setKits([...kits, id]);
        } else {
          setKits([...kits.filter(el => el !== id)]);
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
          <div className='listOfMitrics'>
            <h3 className='headerMetrics'>В комплекте может идти:</h3>
            <div className='cointainer_TC'>
              {
                order.variants.map((item, index)=>(
                  <div key={item.id} className='itemOfMetrics' >
                    <label
                      className='metricLabel' 
                      onChange={async (e)=>{
                        handlerChangeTotalSum(e.target.checked, item.id, order);
                      }}>
                        <input ref={(element) => { refInput.current[index] = element }} type={'checkbox'} className='checkBox' />
                        <span>+</span>
                        <p id='variantName'>{item.name}</p>
                        <p className='item-price'>{item.price} BYN</p>
                    </label>
                    <svg 
                      width={25} 
                      height={25} 
                      viewBox={'0 0 24 24'} 
                      fill={'none'}
                      onClick={()=>{
                        setIsOpen(true);
                        setImagesOfVariant(getImages(item.icon))
                      }}>
                        <path 
                          d='M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z' 
                          stroke='#000'
                          strokeWidth={2}
                          strokeLinecap={'round'}
                          strokeLinejoin={'round'}
                        />
                    </svg>
                  </div>
                ))
              }
            </div>
          </div>
          {
            catalogOrders.map(order=>(
              <div className='containerForHeader_Button' key={order}>
                <h3 className='headerCard'>
                  {order.item.name} 
                  <span className='nameOfKit'>{`( ${nameOfKit} )`}</span>
                  <input 
                    ref={refCount}
                    type={'number'} 
                    className='amountInput'
                    onChange={(e)=>{
                      setAmountOfOrder(e.target.value)
                    }}
                    defaultValue={amountOfOrder}
                    min={0}
                  />
                  <span>{totalSum_TypeComp} Br</span>
                  <svg 
                      width={25} 
                      height={25} 
                      viewBox={'0 0 24 24'} 
                      fill={'none'}
                      onClick={()=>{
                        setIsOpen(true);
                        setImagesOfVariant(getImages(listOfPhotos))
                      }}>
                        <path 
                          d='M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z' 
                          stroke='#000'
                          strokeWidth={2}
                          strokeLinecap={'round'}
                          strokeLinejoin={'round'}
                        />
                    </svg>
                </h3>
                <button className={`addToCartBTN ${amountOfOrder === '0' ? 'disabled' : ''}`}
                        disabled={amountOfOrder === '0'}
                        onClick={async ()=>{
                          localStorage.getItem('accessToken')
                            ? addItemToCart(order.item.id)
                              : setWarningMessageIsOpen(true)
                          fetchOrderById(order)
                          refreshFunction(dispatch) //Fetch to refresh Token
                        }}>В корзину
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="transparent" 
                    stroke="aliceblue" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>        
                </button>
              </div>
            ))
          }
        </div>
        <AddedVariantModal isOpen={isOpen} setIsOpen={setIsOpen} IMGS={imagesOfVariant} />
      </div>
      ))
  )
}
