import React, {useEffect, useState} from 'react'
import './Styles/WorkCatalog.css'
import CardOfWork from './CardOfWork'
import axios from 'axios'

export default function WorkCatalog( {setOpenID} ) {
  
  const [CARDS, setCARDS] = useState([])

  const fetchFanc = () =>{
    axios.get('http://129.159.242.47:8081/Item/GetAll')
    .then(res=>setCARDS(res.data.data))
    // console.log(response.data)
  }

useEffect(()=>{
  fetchFanc()
},[])
  return (
    <div className='CatalogContainer'>
        <h1>Наши Работы</h1>
        <p className='p'>У нас вы можете приобрести разного вида подарки, 
          начиная от выразительных статуэток и заканчивая ключницами и разными подставками. 
          вы сможете сделать заказ и обсудить с мастером вариант вашейго собственного заказа.
        </p>
        <div className='ListOfWorks'>
            {
              CARDS.map(card => (
                <CardOfWork key={card.id} card={card} setOpenID={setOpenID}/>
              ))
            }
            {/* <CardOfWork card={CARDS[0]} /> */}
        </div>

        {/* <button className='SearchMore'>Загрузить ёще...</button> */}
    </div>
  )
}
