import React, { useState } from 'react';
import WarningIcon from '../Icons/WarningIcon';
import BasketIcon from '../Icons/BasketIcon';
import { changeSearchId, loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { refreshFunction } from '../MainFiles/App';
import { Image, Carousel, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalView from '../Modals/ModalView';
import axios from 'axios';
import './Styles/CardOfWork.css';


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
        setTimeout(()=>setAddedOrder!(false), 1500)
      }
    })
    .catch(err => {
      if(err.response.status === 404){
        setModalView!(true)
        setTimeout(()=>setModalView!(false), 2000)
      }
    })
    dispatch(loadingComplate())
  }

  //make examination and return true images from DB-API
  const getImageFromAPI = (photoList: string[]) => {
    return (photoList === null || photoList == undefined || photoList.length === 0) 
      ? require('../Photos/somethingWentWrong.png')
        : photoList[0]
  }

  return (
    <div className='card'>
        <div className='infoOfCard' key={card.id}>
          {
            card.icon === null || card.icon.length == 0
            ? <Image src={getImageFromAPI(card.icon)} width={'190px'} height={'200px'} fallback={require('../Photos/somethingWentWrong.png')}/>
              : <Carousel className='carouselContainer' easing={'ease-in-out'} dots={{className: 'dotsCarousel'}} >
                  {
                    card.icon.map(photo=>(
                      <Image key={photo} src={photo} width={'190px'} height={'200px'} fallback={require('../Photos/somethingWentWrong.png')}/>
                    ))
                  }
                </Carousel>
          }
          <div className='nameButton'>
            <h4>{card.name} <span>{card.price} Br</span> </h4>
            {
              isAllCombination
                ? <Button type='primary'
                          className='addToCartBTN'
                          onClick={async ()=>{
                            localStorage.getItem('accessToken')
                              ? refreshFunction(dispatch, ()=>addItemToCart(card)) //Fetch to refresh Token
                                : setIsWarningOpen(true);
                          }}
                    >
                      В корзину
                    <BasketIcon />     
                  </Button>
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
          <ModalView isOpen={isWarningOpen}>
            <h2 className='headerModal-antd'><WarningIcon/> Внимание!</h2>
            <h4 style={{width: '95%', textAlign: 'start'}}>
              Для того чтобы добавить товар в корзину, вам необходимо 
                <NavLink className={'linkToRegistration'} to={'/Registration'}> войти </NavLink>
              в аккаунт!
            </h4>
          </ModalView>
        </div>
    </div>
  )
}

export default CardOfWork;