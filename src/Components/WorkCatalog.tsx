import React, { useEffect, useMemo, useState } from 'react'
import CardOfWork from './CardOfWork'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Styles/WorkCatalog.css'
import { ICard } from '../Admin/Update/Interfaces/Interface'
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices'

export default function WorkCatalog() {
  
  const [CARDS, setCARDS] = useState<ICard[]>([])
  
  const dispatch = useDispatch();

  //gets all carts of work 
  const getAllItem = () =>{
    dispatch(loadingUncomplate());
      axios.get(`https://api.native-flora.tk/Item/GetAll`)
        .then(res=>setCARDS(res.data.data));
    dispatch(loadingComplate());
  }

  const renderCarts = useMemo(() => {
    return (
      CARDS.sort((a,b) => a.id - b.id).map((card:ICard) => (
        <CardOfWork key={card.id} card={card}/>
      ))
    )
  }, [CARDS]);

  useEffect( getAllItem, []);

  return (
    <div className='catalogContainer' id='catalogOfWorks'>
        <h1>Наши Работы</h1>
        <p className='paragraph'>У нас вы можете приобрести разного вида подарки, 
          начиная от выразительных статуэток и заканчивая ключницами и разными подставками. 
          Вы сможете сделать заказ и обсудить с мастером вариант вашейго собственного заказа.
        </p>
        <div className='listOfWorks'>
          {renderCarts}
        </div>
    </div>
  )
}
