import React from 'react'
import './Styles/Discription.css'


 const exemplesOfWorks = [
  {
    id: Math.random(),
    original:require('../Photos/Logo.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/candle.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/candleBird.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/Cup.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/Human.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/Dog.png'),
  },
  {
    id: Math.random(),
    original:require('../Photos/WorksPictures/BubbleGum.png'),
  }

 ]


export default function Discription() {

  return (
    <div className='DiscriptionContainer' id='Main'>
        {
          exemplesOfWorks.map(work=>(
            <img key={work.id} src={work.original} className = 'Slide' />
          ))
        }
    </div>
  )
}
