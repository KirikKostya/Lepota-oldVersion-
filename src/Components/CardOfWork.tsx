import React, { useState } from 'react';
import SuccessIcon from '../Icons/SuccessIcon';
import WarningIcon from '../Icons/WarningIcon';
import BasketIcon from '../Icons/BasketIcon';
import Carousel from 'react-material-ui-carousel'
import { changeSearchId, loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { refreshFunction } from '../MainFiles/App';
import { Image, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalView from '../Modals/ModalView';
import axios from 'axios';
import './Styles/CardOfWork.css';


interface ICardProps{
  card: ICard
  isAllCombination?: boolean
}
const CardOfWork: React.FC<ICardProps> = (props) => {

  const { card, isAllCombination } = props;
  
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [successModalState, setSuccessModalState] = useState<boolean>(false);
  const [errorModalState, setErrorModalState] = useState<boolean>(false);

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
        setSuccessModalState!(true);
        setTimeout(()=>setSuccessModalState!(false), 1500);
      }
    })
    .catch(err => {
      if(err.response.status === 404){
        setErrorModalState!(true);
        setTimeout(()=>setErrorModalState!(false), 2000);
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
          {
            card.icon === null || card.icon.length == 0
            ? <Image src={getImageFromAPI(card.icon)} width={'190px'} height={'200px'} fallback={require('../Photos/somethingWentWrong.png')}/>
              : <Carousel className='carouselContainer' autoPlay={false} navButtonsAlwaysVisible={true} navButtonsProps={{style: {width: '35px', height: '35px', display: `${card.icon.length <= 1 ? 'none' : 'flex'}`}}}>
                  {
                    card.icon.map(photo=>(
                      <Image key={photo} src={photo} width={'190px'} height={'200px'} fallback={require('../Photos/somethingWentWrong.png')}/>
                    ))
                  }
                </Carousel>
          }
          <div className='nameButton'>
            <h4>{card.name} <span className='price' style={{display: `${card.price ? 'inline' : 'none' }`}}>{card.price} Br</span> </h4>
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
                      to={`${card.name !== 'Комплекты' ? '/TypeCatalog' : '/AllKits'}`}
                      className='catalogBTN' 
                      onClick={()=>{
                        localStorage.setItem('searchOrderById', `${card.id}`);
                        localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(card));
                        refreshFunction(dispatch, ()=>{});
                        dispatch(changeSearchId(card.id));
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

        <ModalView isOpen={successModalState}>
          <h2 className='headerModal-antd'><SuccessIcon />Ваш товар добавлен в корзину!</h2>
        </ModalView>
  
        <ModalView isOpen={errorModalState}>
          <h2 className='headerModal-antd'><WarningIcon />Такой товар уже есть в корзине</h2>
          <h4 className='textModal-antd'>Изменить количество товаров можно в корзине</h4>
        </ModalView>
    </div>
  )
}

export default CardOfWork;