import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/CardOfWork.css'

export default function CardOfWork({card, setOpenID}) {
  return (
    <div className='Card'>
        {/* <img className='IMG' src={}/> */}
        <div className='InfoOfCard' key={card.id}>
          <img src={card.icon} className='IMG'></img>
          <p>~{card.price} Br</p>
          <h4>{card.name}</h4>
        
        <NavLink to='/TypeCatalog' className='CatalogBTN' onClick={()=>setOpenID(card.id)}>Каталог</NavLink>
        </div>
    </div>
  )
}
