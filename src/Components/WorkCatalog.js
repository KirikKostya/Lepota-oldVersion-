import React, { useEffect, useState } from 'react'
import CardOfWork from './CardOfWork'
import axios from 'axios'
import './Styles/WorkCatalog.css'

export default function WorkCatalog( {setOpenID, fetchProducts} ) {
  
  const [CARDS, setCARDS] = useState([])

  const fetchFanc = () =>{
    fetch('https://api.native-flora.tk/Item/GetAll')
    .then(res=>res.json())
    .then(res=>setCARDS(res.data))  
  }

  useEffect(()=>{
    fetchFanc()
  },[])

  return (
    <div className='CatalogContainer' id='CatalogOfWorks'>
        <h1>Наши Работы</h1>
        <p className='p'>У нас вы можете приобрести разного вида подарки, 
          начиная от выразительных статуэток и заканчивая ключницами и разными подставками. 
          Вы сможете сделать заказ и обсудить с мастером вариант вашейго собственного заказа.
        </p>
        <div className='ListOfWorks'>
            {
              CARDS.map(card => (
                <CardOfWork key={card.id} card={card} setOpenID={setOpenID} fetchProducts={fetchProducts}/>
              ))
            }
        </div>
    </div>
  )
}
