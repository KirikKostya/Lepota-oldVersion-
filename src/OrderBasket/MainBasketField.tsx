import React from 'react';
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { ICartItem } from '../Admin/Update/Interfaces/Interface';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface IMainBascketField{
  ItemsInBasket: ICartItem[], 
  setItemsInBasket: (data:ICartItem[])=>void, 
  requestBasketFunc: ()=>void 
}

const MainBasketField: React.FC<IMainBascketField> = (props) => {

  const { ItemsInBasket, setItemsInBasket, requestBasketFunc } = props;

  const dispatch = useDispatch()
  
  //Function removes order from basket
  const deleteItem = async (id: number) => {{
    dispatch(loadingUncomplate());
    await axios.post('https://api.native-flora.tk/Cart/Delete', {
      id: id
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    requestBasketFunc();
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
      ? (cart.variants[0].icon?.length === 0 || !cart.variants[0].icon) ? require('../Photos/somethingWentWrong.png') : cart.variants[0].icon[0]
        : cart.kit
          ? (cart.kit.icon?.length === 0 || !cart.kit.icon) ? require('../Photos/somethingWentWrong.png') : cart.kit.icon[0]
            : cart.item
              ? (cart.item.icon?.length === 0 || !cart.item.icon) ? require('../Photos/somethingWentWrong.png') : cart.item.icon[0]
                : require('../Photos/somethingWentWrong.png')
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
                    <h4>{item.item.name}<br/>
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

export default MainBasketField;