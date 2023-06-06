import React from 'react'
import { refreshFunction } from '../MainFiles/App'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ICartItem } from '../Admin/Update/Interfaces/Interface'
import { Dispatch } from 'redux'
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices'

interface IMainBascketField{
  ItemsInBasket: ICartItem[], 
  setItemsInBasket: (data:ICartItem[])=>void, 
  requestBasketFunc: ()=>void 
}

export default function MainBasketField(props: IMainBascketField) {

  const { ItemsInBasket, setItemsInBasket, requestBasketFunc }=props;

  const dispatch = useDispatch()
  
  //Function removes order from basket
  const deleteItem = async (id: number) => {{
    dispatch(loadingUncomplate());
    await axios.post('https://api.native-flora.tk/Cart/Delete', {
      id: id
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    await requestBasketFunc();
    dispatch(loadingComplate());
  }}

  //function updates amount of order in basket 
  const updateAmountOfOrder = async (ID:number, Amount:number) => {
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
  const findPhoto = (cart:ICartItem):string => {
    return cart.variants
            ? cart.variants[0].icon[0]
              : (cart.kit)
                ? cart.kit.icon[0]
                  : cart.item.icon[0]
  }

  //gets variants or kit of select cart
  const getVariantsOrKit = (cart:ICartItem):string => {
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
                : ItemsInBasket.sort((a,b)=>a.cartItemId - b.cartItemId).map(item=>(
                    <div className='item' key={item.cartItemId}>
                    <img width={55} height={55} src={findPhoto(item)}/>
                    <h4 onClick={()=>console.log(item)}>{item.item.name}<br/>
                      <span className={`variant-Kit ${getVariantsOrKit(item) || 'hide'}`}>{` ( ${getVariantsOrKit(item)} ) `}</span>
                    </h4>
                    <span>
                        {
                          item.variants
                            ? item.variants.map( el => el.price )
                              : item.kit
                                ? item.kit.price
                                  : item.item.price
                        } Br</span> 
                    <div className='changeAmount'>
                      <input 
                          id='changeInput'
                          type='number'
                          className='changeInput' 
                          min={1}
                          max={100}
                          onChange={(e:any)=>updateAmountOfOrder(item.cartItemId, e.target.value)}
                          defaultValue={item.amount}/>
                    </div>
                    <h3 id='summaryPrice'>{item.price} Br</h3>
                    <button 
                      className='deleteItem' 
                        onClick={()=>{
                          deleteItem(item.cartItemId);
                          refreshFunction(dispatch, ()=>{})
                        }}>&times;</button>
                    </div>
            ))
        }
    </>
  )
}
