import React from 'react'
import './Styles/AboutKashpo.css'

const exemplesOfUsed = [
    {
        id: 0,
        img: require('../Photos/FlowersInKashpo.png'),
        tittle: 'Для растений и цветов'
    },
    {
        id: 1,
        img: require('../Photos/SweetsInKashpo.png'),
        tittle: 'Для конфет и сладостей'
    },
    {
        id: 2,
        img: require('../Photos/MoneyKashpo.png'),
        tittle: 'Для денег и ценностей'
    },
    {
        id: 3,
        img: require('../Photos/SpoonInKashpo.png'),
        tittle: 'Для столовых приборов'
    },
]

export default function AboutKashpo() {
  return (
    <div className='ContainerForAboutKashpo' id='AboutCashpo'>
        <h1>О Кашпо</h1>
        <p> Кашпо выполнено из гипсобетона. В состав входят: скульптурный гипс, цемент, добавки. Изделия получаются достаточно прочными!</p>
        <h3>Кашпо можно использовать:</h3>
        <div className='ExamplesOfUsing'>
            {
                exemplesOfUsed.map(Item=>(
                    <div key={Item.id} className='Fact'>
                        <img className='Img' src={Item.img} />
                        <h3>{Item.tittle}</h3>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
