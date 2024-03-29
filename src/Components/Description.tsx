import React from 'react';
import './Styles/Description.css';

interface IExampleDescription{
  id: number,
  original: string
}

const examplesOfWorks: IExampleDescription[] = [
  {
    id: 1,
    original:require('../Photos/WorksPictures/candle.png'),
  },
  {
    id: 2,
    original:require('../Photos/WorksPictures/candleBird.png'),
  },
  {
    id: 3,
    original:require('../Photos/WorksPictures/Cup.png'),
  },
  {
    id: 4,
    original:require('../Photos/WorksPictures/Human.png'),
  },
  {
    id: 5,
    original:require('../Photos/WorksPictures/Dog.png'),
  },
  {
    id: 6,
    original:require('../Photos/WorksPictures/BubbleGum.png'),
  }
]

const Description: React.FC = () => {

  return (
    <div className='descriptionContainer' id='main'>
        {
          examplesOfWorks.map(work=>(
            <img key={work.id} src={work.original} className='slide'/>
          ))
        }
    </div>
  )
}

export default Description;
