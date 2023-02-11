import React, {useState, useEffect} from 'react'
import BackButton from '../Components/BackButton'
import './Style/TypeCatalog.css'
import axios from 'axios';
import { refreshFunction } from '../App';
import { NavLink } from 'react-router-dom';
import Loading from 'react-loading';
import ReactModal from 'react-modal';

export default function TypeCatalog({ setIsBasketEmpty, catalogOrders}) {

  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [modalViewStep, setModalViewStep] = useState(1)

  const customStylesForModal = {
    content: {
      width: '40%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '20px', 
    },
  } 

  const AddItemToCart = async (cardId) =>{
    axios.post(`https://api.native-flora.tk/Cart/Add`, {
      id: cardId,
      amount: 2
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(res => {
      if(res.status === 200){
        setAddedOrder(true)
        setTimeout(()=>setAddedOrder(false), 5000)
        setIsBasketEmpty(false)
      }
    })
    .catch(err => {
      if(err.response.status === 404){
        setModalView(true)
      }
    })
  }


  return (
    <div className='ContainerForTypeCatalog'>
      {
        (WarningMessageIsOpen)
            ?
            <ReactModal 
                isOpen={WarningMessageIsOpen}
                ariaHideApp={false}
                contentLabel="Selected Option"
                style={customStylesForModal}>
              <h1>Внимание!</h1>
              <h2>Для того чтобы добавить товар в корзину, вам необходимо <NavLink to={'/Registration'}>войти</NavLink> в аккаунт!</h2>
            </ReactModal>

            : <>
                  <h1>Каталог товаров по выбранному типу</h1>
                  <BackButton Link='/'/>
                  <div className='ContainerForCards'>
                  {
                    catalogOrders === null
                    ? <Loading
                        type="spokes"
                        color="black"
                        height="50px"
                        width="50px"
                        padding="20px"
                      />  
                      :catalogOrders.map(order =>(
                        <div key={order.id} className='Card'> 
                          <img className='IMG' src={order.icon && require('../Photos/somethingWentWrong.png')} />
                          <h4>{order.name} <span>{order.price} Br</span> </h4>
                          <p>Здесь будет небольшая информация про продукт</p>
                          <button className='AddToCartBTN' 
                                  onClick={async ()=>{
                                    localStorage.getItem('accessToken')
                                      ? AddItemToCart(order.id)
                                        : setWarningMessageIsOpen(true)
                                    setModalViewStep(1)
                                    refreshFunction()
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
                    {
                      modalView
                        ? <ReactModal 
                            isOpen={modalView}
                            ariaHideApp={false}
                            contentLabel="Selected Option"
                            style={customStylesForModal}
                          >
                            {
                              modalViewStep === 1
                                ? <div className='modalViewContainer'>
                                      <h2>Такой товар ужде есть в корзине!</h2>
                                      <h5 className='changeParametrsOfOrder' 
                                          onClick={()=> setModalViewStep(modalViewStep+1)}>
                                            Хотите изменить количество товара или его составляющие?
                                      </h5>
                                      <button onClick={()=>setModalView(!modalView)}>Закрыть</button>  
                                  </div>
                                  :<div className='modalViewContainer'>
                                      <h2>Ваш товар</h2>
                                      <button onClick={()=>setModalView(!modalView)}>Закрыть</button>
                                  </div>
                            }
                            
                          </ReactModal>
                          :<></>
                    }
                </>
      }
    </div>
  )
}
