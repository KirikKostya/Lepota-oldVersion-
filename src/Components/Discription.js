import  axios  from 'axios'
import React,{useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel'
import ImageGallery from 'react-image-gallery' 
import './Styles/Discription.css'


 const Pictures = [
  {
    original:require('../Photos/WorksPictures/candle.png'),
    trumbnail: require('../Photos/WorksPictures/candle.png')
  },
  {
    original:require('../Photos/WorksPictures/candleBird.png'),
    trumbnail: require('../Photos/WorksPictures/candleBird.png')
  },
  {
    original:require('../Photos/WorksPictures/Cup.png'),
    trumbnail: require('../Photos/WorksPictures/Cup.png')
  },
  {
    original:require('../Photos/WorksPictures/Human.png'),
    trumbnail: require('../Photos/WorksPictures/Human.png')
  },
  {
    original:require('../Photos/WorksPictures/Dog.png'),
    trumbnail: require('../Photos/WorksPictures/Dog.png')
  },
  {
    original:require('../Photos/WorksPictures/BubbleGum.png'),
    trumbnail: require('../Photos/WorksPictures/BubbleGum.png')
  },

 ]
 const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function Discription() {

  return (
    <div className='DiscriptionContainer' id='Main'>
        {
          Pictures.map(work=>(
            <img key={work.original} src={work.trumbnail} className = 'Slide' />
          ))
        }
    </div>
    // <ImageGallery showPlayButton={false}
    //               lazyLoad={true}
    //               showFullscreenButton={false}
    //               showThumbnails={false}
    //               showBullets={true}
    //               showNav={true}
    //               // additionalClass={'IMG'}
    //               // items={getItems(Pictures)}
    //               items={images}
    //               /> 
  )
}
