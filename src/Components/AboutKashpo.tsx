import React from 'react'
import './Styles/AboutKashpo.css'

interface IExample{
    id: number,
    img: string,
    tittle: string
}

const exemplesOfUsed: IExample[] = [
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

const AboutKashpo: React.FC = () => {

  return (
    <div className='containerForAboutKashpo' id='aboutCashpo'>
        <h1>О Кашпо</h1>
        <p> Кашпо выполнено из гипсобетона. В состав входят: скульптурный гипс, цемент, добавки. Изделия получаются достаточно прочными!</p>
        <h3>Кашпо можно использовать:</h3>
        <div className='ExamplesOfUsing'>
            {
                exemplesOfUsed.map(Item=>(
                    <div key={Item.id} className='fact'>
                        <img className='aboutKashpoImg' src={Item.img} />
                        <h3>{Item.tittle}</h3>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AboutKashpo;
