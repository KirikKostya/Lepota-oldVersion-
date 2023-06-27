import React, { useEffect, useMemo, useState } from 'react';
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { useDispatch } from 'react-redux';
import CardOfWork from './CardOfWork';
import axios from 'axios';
import './Styles/WorkCatalog.css';

const WorkCatalog: React.FC = () => {
  
  const [CARDS, setCARDS] = useState<ICard[]>([]);
  
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

export default WorkCatalog;