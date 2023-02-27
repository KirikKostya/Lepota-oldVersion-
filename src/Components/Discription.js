import React from 'react'
import './Styles/Discription.css'


 const Pictures = [
  {
    id: Math.random(),
    original:require('../Photos/LOGO.png'),
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
          Pictures.map(work=>(
            <img key={work.id} src={work.original} className = 'Slide' />
          ))
        }
    </div>
  )
}
