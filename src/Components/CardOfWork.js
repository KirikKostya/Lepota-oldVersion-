import React from 'react'
import '../Styles/CardOfWork.css'

export default function CardOfWork({card}) {
  return (
    <div className='Card'>
        {/* <img className='IMG' src={}/> */}
        <div key={card.id}>
          <p>Photo</p>
          <h4>{card.Name}</h4>
          <h5>{card.price}</h5>
        </div>
        <button className='CatalogBTN'>Каталог</button>
    </div>
  )
}
