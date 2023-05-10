import React, { useEffect, useState } from 'react'
import CardOfWork from './CardOfWork'
// import LoadingComp from '../Loading/LoadingComp'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Styles/WorkCatalog.css'

export default function WorkCatalog() {
  
  const [CARDS, setCARDS] = useState([])
  
  const dispatch = useDispatch();

  const fetchFanc = () =>{
    axios.get(`https://api.native-flora.tk/Item/GetAll`)
      .then(res=>{
        setCARDS(res.data.data)
        dispatch({type: 'LOADING_IS_COMPLETED'});
      })
  }

  useEffect(()=>{
    dispatch({type: 'LOADING_IS_UNCOMPLETED'});
    fetchFanc()
  }, [])

  return (
    <div className='catalogContainer' id='catalogOfWorks'>
        <h1>Наши Работы</h1>
        <p className='paragraph'>У нас вы можете приобрести разного вида подарки, 
          начиная от выразительных статуэток и заканчивая ключницами и разными подставками. 
          Вы сможете сделать заказ и обсудить с мастером вариант вашейго собственного заказа.
        </p>
        <div className='listOfWorks'>
          {
            CARDS.sort((a,b) => a.id - b.id).map(card => (
              <CardOfWork key={card.id} card={card}/>
            ))
          }
        </div>
    </div>
  )
}
