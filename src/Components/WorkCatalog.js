import React from 'react'
import '../Styles/WorkCatalog.css'
import CardOfWork from './CardOfWork'

const CARDS = [
    {
      id: 0,
      Name: 'ALLIUM',
      price: '120$'
    },
    {
      id: 1,
      Name: 'ALOE TRASKI',
      price: '130$'
    },
    {
      id: 2,
      Name: 'ALSROEMERIA',
      price: '140$'
    },
    {
      id: 3,
      Name: 'AMARYLLIS',
      price: '100$'
    }
]

export default function WorkCatalog() {
  return (
    <div className='CatalogContainer'>
        <h1>Наши Работы</h1>
        <div className='ListOfWorks'>
            {
              CARDS.map(card => (
                <CardOfWork key={card.id} card={card} />
              ))
            }
            {/* <CardOfWork card={CARDS[0]} /> */}
        </div>

        <button className='SearchMore'>Загрузить ёще...</button>
    </div>
  )
}
