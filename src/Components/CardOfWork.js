import React from 'react'
import { refreshFunction } from '../MailFiles/App'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Styles/CardOfWork.css'

export default function CardOfWork({ card }) {

  const dispatch = useDispatch();

  //make examination and return true images from DB-API
  const getImageFromAPI = (photoList) => {
    if (photoList === null || photoList[0] == undefined){ 
      return  require('../Photos/somethingWentWrong.png')
    } else {
      return photoList[0]
    }
  }

  return (
    <div className='Card'>

        <div className='InfoOfCard' key={card.id}>
          <img src={getImageFromAPI(card.icon)} className='IMG' />
          
          <div className='name_button'>
            <h4>{card.name} <span>{card.price} Br</span> </h4>
            <NavLink 
              to='/TypeCatalog' 
              className='CatalogBTN' 
              onClick={()=>{
                dispatch({type: 'SET_SEARCH_ORDER-ID', payload: card.id})
                localStorage.setItem('searchOrderById', card.id);
                localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(card))
                refreshFunction(dispatch);
              }}>Подробнее</NavLink>
          </div>
                 
        </div>
    </div>
  )
}