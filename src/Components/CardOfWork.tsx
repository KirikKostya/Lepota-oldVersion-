import React, { useState } from 'react'
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Styles/CardOfWork.css';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { changeSearchId, loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices'
import BasketIcon from '../Icons/BasketIcon';
import axios from 'axios';
import WarningModalView from '../Modals/WarningModalView';

interface ICardProps{
  card: ICard
  isAllCombination?: boolean
  setAddedOrder?: React.Dispatch<React.SetStateAction<boolean>> 
  setModalView?: React.Dispatch<React.SetStateAction<boolean>>
}
const CardOfWork: React.FC<ICardProps> = (props) => {

  const { card, isAllCombination, setAddedOrder, setModalView } = props;
  
  const [ isWarningOpen, setIsWarningOpen ] = useState<boolean>(false);
  const dispatch = useDispatch();

  const addItemToCart=(card: ICard)=>{
    dispatch(loadingUncomplate());
    axios.post('https://api.native-flora.tk/Cart/Add', {
      id: card.id,
      amount: 1,
      variants: card.variants 
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(res => {
      if(res.status === 200){
        setAddedOrder!(true)
        setTimeout(()=>setAddedOrder!(false), 2000)
      }
    })
    .catch(err => {
      console.log(err)
      if(err.response.status === 404){
        setModalView!(true)
        setTimeout(()=>setModalView!(false), 3000)
      }
    })
    dispatch(loadingComplate())
  }

  //make examination and return true images from DB-API
  const getImageFromAPI = (photoList: string[]) => {
    return (photoList === null || photoList == undefined ) 
      ? require('../Photos/somethingWentWrong.png')
        : photoList[0]
  }

  return (
    <div className='card'>
        <div className='infoOfCard' key={card.id}>
          <img src={getImageFromAPI(card.icon)} className='IMG' />
          <div className='nameButton'>
            <h4>{card.name} <span>{card.price} Br</span> </h4>
            {
              isAllCombination
                ? <button className={`addToCartBTN`}
                          onClick={async ()=>{
                            localStorage.getItem('accessToken')
                              ? refreshFunction(dispatch, ()=>addItemToCart(card)) //Fetch to refresh Token
                                : setIsWarningOpen(true);
                          }}
                    >
                      В корзину
                    <BasketIcon />     
                  </button>
                  : <NavLink 
                      to='/TypeCatalog' 
                      className='catalogBTN' 
                      onClick={()=>{
                        dispatch(changeSearchId(card.id));
                        localStorage.setItem('searchOrderById', `${card.id}`);
                        localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(card));
                        refreshFunction(dispatch, ()=>{});
                      }}
                    >Подробнее</NavLink>
            }
          </div>   
          <WarningModalView warningMessageIsOpen={isWarningOpen} header={'Внимание!'}>
            Для того чтобы добавить товар в корзину, вам необходимо 
              <NavLink className={'linkToRegistration'} to={'/Registration'}> войти </NavLink>
            в аккаунт!
          </WarningModalView>
        </div>
    </div>
  )
}

export default CardOfWork;