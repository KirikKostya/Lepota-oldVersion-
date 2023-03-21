import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider';
import { useDispatch } from 'react-redux';
import { refreshFunction } from '../MailFiles/App'
import axios from 'axios';

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

  return (
    catalogOrders.map(order =>(
        <div key={order.id} className='Card'> 
          <SimpleImageSlider
            className='SimpleImage'
            width={200}
            height={180}
            navSize={25}
            navMargin={0}
            style={{background: 'transparent'}}
            navStyle={2}
            slideDuration={0.7}
            images={getImages(order.icon)}
            showBullets={false}
            showNavs={true} />
          
          <h4>{order.name} <span>{order.price} Br</span> </h4>
          <p>Здесь будет небольшая информация про продукт</p>
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
  )
}
