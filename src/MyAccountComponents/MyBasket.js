import React, {useEffect, useRef, useState} from 'react'
import '../MyAccountComponents/Styles/MyBasket.css'
import UpNavigation from '../Components/UpNavigation.js'
import axios from 'axios'
import Loading from 'react-loading'
import { NavLink } from 'react-router-dom'
import { refreshFunction } from '../App'
import ContactWithUs from '../Components/ContactWithUs'

export default function MyBasket() {

  const [ItemsInBasket, setItemsInBasket] = useState([])
  const [isBasketEmpty, setIsBasketEmpty] = useState(false)

  const deleteItem = async (id) => {{
    await axios.post('https://api.native-flora.tk/Cart/Delete', {
      id: id
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    
    await requestBasketFunc()
  }}

  const requestBasketFunc = async () => {
  axios.post( 'https://api.native-flora.tk/Cart/All', {}, {
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .then(res => setItemsInBasket(res.data.data.cartItems) ) 
  .catch(err=> (err.response.data.message) 
                  ? setItemsInBasket([]) 
                    : '')
  }

  const updateAmountOfOrder = async (ID, Amount) => {
    axios.post('https://api.native-flora.tk/Cart/Update', {
        id: ID, 
        amount: Amount
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}
      }
    )
    .then(res=>setItemsInBasket(res.data.data.cartItems))
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    requestBasketFunc()
  }, [])

  return (
    <>
      <UpNavigation hide={'hide'}/>
      
      {/* <div className='backItemBlock'>
        <NavLink to='/' className='NavLink'>&#11013;</NavLink>
        <h4>Корзина</h4>
      </div> */}

      <div className='fullContainer'>
        <div className='MainFielfForBasket'>
          <div className='basketParametrs'>
            <p id='fullName'>Товар</p>
            <p>Цена</p>
            <p>Кол-во</p>
            <p>Сумма</p>
          </div>
            {
              isBasketEmpty
                ? <Loading
                    type="spokes"
                    color="black"
                    height="50px"
                    width="50px"
                    padding="20px"
                  />
                : ItemsInBasket.sort((a,b)=> a.item.id - b.item.id).map(item => (
                    <div className='Item' key={item.item.id}>
                      <img width={55} height={55} src={item.item.icon[0]}/>
                      <h4>{item.item.name}</h4>
                      <h3>{item.item.price} Br</h3>
                      <div className='ChangeAmount'>
                        <input 
                              id='ChangeInput'
                              type='number'
                              className='ChangeInput' 
                              min={1}
                              max={100}
                              onChange={(e)=>{
                                updateAmountOfOrder(item.item.id, e.target.value)
                              }}
                              defaultValue={item.amount}/>
                      </div>
                      <h3>{item.price}</h3>
                      <button className='deleteItem' onClick={()=>deleteItem(item.item.id)}>&times;</button>
                    </div>
                  ))
            }
            {
              ItemsInBasket.length === 0
                ? <div className='emptyBasketMessage'>
                    <h3>Ваша корзина пуста!</h3>
                    <NavLink to='/' className='chooseGoods'>Перейти к выбору товара</NavLink>
                  </div>
                  :<></>
            }
        </div>

        <div className='Chek'>
          <h3>Расчёт</h3>
          <div className='Parametrs'>
            <h5>Сумма: <span>100 Br</span></h5>
            <h5>Итог: <span>100 Br</span></h5>
          </div>
          <button className='makeBTN'>Оформить заказ</button>
        </div>
      </div>
      
      <ContactWithUs />
    </>
  )
}
