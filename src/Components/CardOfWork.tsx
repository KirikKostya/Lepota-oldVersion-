import React from 'react'
import { refreshFunction } from '../MailFiles/App'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Styles/CardOfWork.css'
import { ICard } from '../Admin/Update/Interfaces/Interface'

export default function CardOfWork ( card: ICard ) {

  const dispatch = useDispatch();

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
          <div className='name_button'>
            <h4 onClick={()=>console.log(card)}>{card.name} <span>{card.price} Br</span> </h4>
            <NavLink 
              to='/TypeCatalog' 
              className='catalogBTN' 
              onClick={()=>{
                dispatch({type: 'SET_SEARCH_ORDER-ID', payload: card.id})
                localStorage.setItem('searchOrderById', `${card.id}`);
                localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(card))
                refreshFunction(dispatch);
              }}>Подробнее</NavLink>
          </div>   
        </div>
    </div>
  )
}
