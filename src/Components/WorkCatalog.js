import React from 'react'
import '../Styles/WorkCatalog.css'
import CardOfWork from './CardOfWork'

const CARDS = [
    {
      id: 0,
      Name: 'Лила',
    },
    {
      id: 1,
      Name: 'Подсвечники',
    },
    {
      id: 2,
      Name: 'Пазлы',
    },
    {
      id: 3,
      Name: 'Кличницы',
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
