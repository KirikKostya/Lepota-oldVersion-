import React, {useState, useEffect} from 'react'
import BackButton from '../Components/BackButton'
import './Style/TypeCatalog.css'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function TypeCatalog({OpenID, setIsBasketEmpty}) {

  const [catalogOrders, setCatalogOrders] = useState(Array);
  const [countOfOrders, setCountOfOrders] = useState(1)
  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [openCount, setOpenCount] = useState(false)
  const [AddedOrder, setAddedOrder] = useState(false)

  const AddItemToCart = async (cardId) =>{
    axios.post(`http://129.159.242.47:8081/Cart/Add`, {
      id: cardId,
      amount: 1,
      variants: [ 1 ]
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(res=>res.status === 200?setIsBasketEmpty(false):'')
    .catch(err => console.log(err))
  }
  
  useEffect(()=>{
    fetch(`http://129.159.242.47:8081/Item/GetById?id=${OpenID}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.data == null){
        setCatalogOrders(null)
      } else {
        setCatalogOrders([res.data])
      }
      })
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
                  <BackButton Link='/'/>
                  <button onClick={()=>console.log(catalogOrders)}></button>
                  <div className='ContainerForCards'>
                  {
                    catalogOrders === null
                    ? <></>
                      :catalogOrders.map(order =>(
                        <div key={order.id} className='Card'> 
                          <img className='IMG' src={order.icon && require('../Photos/somethingWentWrong.png')} />
                          <h4>{order.price} Br</h4> 
                          <h3>{order.name}</h3>
                          <button className='AddToCartBTN' 
                                  onClick={async ()=>{
                                    if(localStorage.getItem('accessToken')){
                                      setOpenCount(true)
                                      AddItemToCart(order.id)
                                      console.log(order.id)
                                    } else {
                                      setWarningMessageIsOpen(true)
                                    }
                                  }}>В корзину &#128722;</button>
                        </div>
                      ))
                  }
                    </div>
                    {/* {
                        (openCount)
                          ?<div className='modelCountWindow'>
                            <h3>Количество выбранного товара</h3>
                              <input className='countInput' 
                                    type='number'
                                    min={0}
                                    onChange={e=>setCountOfOrders(e.target.value)} 
                                    placeholder={countOfOrders}/>
                              <button className='AddBtn' 
                                      onClick={()=>{
                                        AddItemToCart(idOfAddedOrder);
                                        setOpenCount(false);
                                        setAddedOrder(true)
                                      }}>Добавить</button>
                          </div>
                            :<></>
                      } */}
                    {
                      (AddedOrder)
                        ?<div className='AddedOrder'>
                          <h1>Ваш товар добавлен в корзину!</h1>
                         </div>
                          :<></>
                    }
                </>
      }
      
      <div className='ToOrder'>
        
      </div>
      
    </div>
  )
}
