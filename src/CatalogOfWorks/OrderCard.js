import React from 'react'
import axios from 'axios';
import { refreshFunction } from '../App'
import SimpleImageSlider from 'react-simple-image-slider';

export default function OrderCard(
  {
    catalogOrders,
    setWarningMessageIsOpen,
    setModalViewStep,
    setSelectedOrder,
    setAddedOrder,
    setIsBasketEmpty,
    setModalView
  }
) {

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
      .then(res=>setSelectedOrder(res.data.data.cartItems.filter(item=>item.item.id === ID))) 
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
          setIsBasketEmpty(false)
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
            height={150}
            navSize={25}
            navMargin={0}
            style={{background: 'transparent'}}
            navStyle={3}
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
                    refreshFunction() //Fetch to refresh Token
                  }}>В корзину &#128722;</button>
        </div>
      ))
  )
}
