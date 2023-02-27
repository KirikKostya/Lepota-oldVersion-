import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function MainBasketField({ ItemsInBasket, setItemsInBasket, requestBasketFunc }) {
  
    const deleteItem = async (id) => {{
        await axios.post('https://api.native-flora.tk/Cart/Delete', {
          id: id
        }, {
          headers:{'x-access-token': localStorage.getItem('accessToken')}
        })
        
        await requestBasketFunc()
      }}
    
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
  return (
    <>
        {
            ItemsInBasket.length === 0
              ? <div className='emptyBasketMessage'>
                    <h3>Ваша корзина пуста!</h3>
                    <NavLink to='/' className='chooseGoods'>Перейти к выбору товара</NavLink>
                </div>
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
                        <h3 id='summaryPrice'>{item.price}</h3>
                        <button className='deleteItem' onClick={()=>deleteItem(item.item.id)}>&times;</button>
                        </div>
            ))
        }
    </>
  )
}
