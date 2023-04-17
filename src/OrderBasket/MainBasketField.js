import React from 'react'
import { refreshFunction } from '../MailFiles/App'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function MainBasketField({ ItemsInBasket, setItemsInBasket, requestBasketFunc }) {
  
    const dispatch = useDispatch()
    
    //Function removes order from basket
    const deleteItem = async (id) => {{
        await axios.post('https://api.native-flora.tk/Cart/Delete', {
          id: id
        }, {
          headers:{'x-access-token': localStorage.getItem('accessToken')}
        })
        
        await requestBasketFunc()
      }}
  
    //function updates amount of order in basket 
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

    //find photo
    const findPhoto = (cart) => {
      return cart.variants
              ? cart.variants[0].icon[0]
                : (cart.kit)
                  ? cart.kit.icon[0]
                    : cart.item.icon[0]
    }

    //gets variants or kit of select cart
    const getVariantsOrKit = (cart) => {
      return cart.variants
              ? cart.variants.map(item=>item.name).join(' ')
                : cart.kit 
                  ? cart.kit.name
                    : ''
    }

  return (
    <>
        {
          ItemsInBasket.length === 0
            ? <div className='emptyBasketMessage'>
                <h3>Ваша корзина пуста!</h3>
                <NavLink to='/' className='chooseGoods'>Перейти к выбору товара</NavLink>
              </div>
                : ItemsInBasket.sort((a,b) => a.cartItemId - b.cartItemId).map(item => (
                    <div className='Item' key={item.cartItemId}>
                    <img width={55} height={55} src={findPhoto(item)}/>
                    <h4 onClick={()=>console.log(item)}> {item.item.name} <br/>
                      <span className={`variant-Kit ${getVariantsOrKit(item) || 'hide'}`} >{` ( ${getVariantsOrKit(item)} ) `}</span>
                    </h4>
                    <span>
                        {
                          item.variants
                            ? item.variants.map( el => el.price )
                              : item.kit
                                ? item.kit.price
                                  : item.item.price
                        } Br</span> 
                    <div className='ChangeAmount'>
                      <input 
                          id='ChangeInput'
                          type='number'
                          className='ChangeInput' 
                          min={1}
                          max={100}
                            onChange={(e)=>{
                                updateAmountOfOrder(item.cartItemId, e.target.value)
                            }}
                          defaultValue={item.amount}/>
                    </div>
                    <h3 id='summaryPrice'>{item.price} Br</h3>
                    <button 
                      className='deleteItem' 
                        onClick={()=>{
                          deleteItem(item.cartItemId);
                          refreshFunction(dispatch)
                        }}>&times;</button>
                    </div>
            ))
        }
    </>
  )
}
