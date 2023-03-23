import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import axios from 'axios';
import './Style/OrderCard.css'

const variants = [
  {
    id: 1,
    name: 'стрелки',
    price: 58,
  },
  {
    id: 2,
    name: 'шипы',
    price: 60,
  }
]

export default function OrderCard(
  {
    catalogOrders,
    setWarningMessageIsOpen,
    setModalViewStep,
    setSelectedOrder,
    setAddedOrder,
    setModalView
  }
) {
    
    const totalSum_TypeComp = useSelector(state=>state.totalSum_TypeComp);
    const dispatch = useDispatch()

    //Make list from response data
    const getImages = (images) => {
      return images.map(image=>{
        let galleryItem = {};
        galleryItem['url'] = image;
        return galleryItem; 
      }); 
    }

    //Make List of sort selected orders 
    const fetchOrderById = (ID) => {
      axios.post( 'https://api.native-flora.tk/Cart/All', {}, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}
      })
      .then(res=>{
        if(res.data.data){          
          setSelectedOrder(res.data.data.cartItems.filter(item=>item.item.id === ID))
        }
      }) 
    }

    //Added item to cart of order
    const AddItemToCart = async (cardId) =>{
      axios.post(`https://api.native-flora.tk/Cart/Add`, {
        id: cardId,
        amount: 1
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
      .then(res => {
        if(res.status === 200){
          setAddedOrder(true)
          setTimeout(()=>setAddedOrder(false), 2000)
        }
      })
      .catch(err => {
        if(err.response.status === 404){
          setModalView(true)
        }
      })
    }

    //changes total price, when user ckick on label
    const handlerChangeTotalSum = (isCheckedLabel, price) =>{
      isCheckedLabel
        ? dispatch({type: 'INCREMENT_TOTAL_SUM_TYPE-COMP', payload: price})
          : dispatch({type: 'DECREMENT_TOTAL_SUM_TYPE-COMP', payload: price})
    }

  return (
    catalogOrders.map(order =>(
      <div className={'mainContainer'} key={order.id}>
        <div className='containerForCards'>
          <div className='item-Card'> 
            <SimpleImageSlider
              className='simpleImage'
              width={380}
              height={330}
              navSize={25}
              navMargin={0}
              style={{background: 'transparent'}}
              navStyle={2}
              slideDuration={0.7}
              images={getImages(order.icon)}
              showBullets={false}
              showNavs={true} />
          </div>
        </div>
        <div className='additionalMetrics'>
          <div className='listOfMitrics'>
            <h3 className='headerMetrics'>В комплекте может идти:</h3>
            <div className='cointainer_TC'>
              {
                variants.map(item=>(
                  <div key={item.id} className='itemOfMetrics' >
                    <label 
                      className='metricLabel' 
                      onChange={(e)=>handlerChangeTotalSum(e.target.checked, item.price)}>
                        <input type={'checkbox'} className='checkBox' />
                        <span>+</span>
                        <p>{item.name}</p>
                        <p className='item-price'>{item.price} BYN</p>
                    </label>
                    <svg width={25} height={25} viewBox={'0 0 24 24'} fill={'none'}>
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
              <div className='containerForHeader_Button' key={order.name}>
                <h3 className='headerCard'>{order.name} <span>{totalSum_TypeComp} Br</span></h3>
                <button className='AddToCartBTN' 
                        onClick={async ()=>{
                          localStorage.getItem('accessToken')
                            ? AddItemToCart(order.id)
                              : setWarningMessageIsOpen(true)
                          fetchOrderById(order.id)
                          setModalViewStep(1) //Change step for update order
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
      </div>
      ))
  )
}
