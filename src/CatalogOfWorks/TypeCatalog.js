import React, {useState, useEffect} from 'react'
import BackButton from '../Components/BackButton'
import './Style/TypeCatalog.css'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function TypeCatalog({OpenID}) {
  const [catalogOrders, setCatalogOrders] = useState([]);
  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)

  const AddItemToCart = async (cardId) =>{
    axios.post('https://api.hlofiys.tk/cart/add', {
      id: cardId.id,
      amount: 1 //
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .catch(err => console.log(err))
  }
  
  useEffect(()=>{
    fetch(`https://api.hlofiys.tk/types/items/get/${OpenID}`)
    .then(res=>res.json())
    .then(res=>setCatalogOrders(res))
  },[])

  return (
    <div className='ContainerForTypeCatalog'>
      {
        (WarningMessageIsOpen === true)
          ?<div className='WarningMessage'>
            <BackButton Link='/'/>
            <h1>Внимание!</h1>
            <h2>Для того чтобы добавить товар в корзину, вам необходимо <NavLink to={'/Registration'}>войти</NavLink> в аккаунт!</h2>
           </div>
            : <>
                  <h1>Каталог товаров по выбранному типу</h1>
                  <BackButton Link='/WorkCatalog'/>
                  <div className='ContainerForCards'>
                    {
                      catalogOrders.map(order =>(
                        <div key={order.id} className='Card'> 
                          <img className='IMG' src={order.icon}></img>
                          <h4>{order.price} Br</h4> 
                          <h3>{order.name}</h3>
                          <button className='AddToCartBTN' 
                                  onClick={()=>{
                                    if(localStorage.getItem('accessToken')){
                                      setAddedOrder(true);
                                      setTimeout(()=>setAddedOrder(false), 3000);
                                      AddItemToCart(order)
                                    } else {
                                      setWarningMessageIsOpen(true)
                                    }
                                  }}>В корзину &#128722;</button>
                        </div>
                      ))
                    }
                    </div>
                    {
                      (AddedOrder)
                        ?<div className='AddedOrder'>
                          <h1>Ваш товар добавлен в корзину!</h1>
                         </div>
                          :<></>
                    }
                </>
      }
      
        
    </div>
  )
}
