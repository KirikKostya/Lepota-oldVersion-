import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/CardOfWork.css'

export default function CardOfWork({card}) {
  return (
    <div className='Card'>
        {/* <img className='IMG' src={}/> */}
        <div className='InfoOfCard' key={card.id}>
          <p>Photo</p>
          <h4>{card.Name}</h4>
          <h5>{card.price}</h5>
        </div>
        <NavLink to='/TypeCatalog' className='CatalogBTN'>Каталог</NavLink>
    </div>
  )
}
