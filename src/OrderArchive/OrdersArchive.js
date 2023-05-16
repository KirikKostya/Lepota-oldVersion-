import React, { useEffect, useState } from 'react';
import ContactWithUs from '../Components/ContactWithUs.js';
import UpNavigation from '../Components/UpNavigation.js'
import ListOfArchive from './ListOfArchive.js'
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MailFiles/App.js';
import axios from 'axios';
import './Styles/OrdersArchive.css';

export default function OrdersArchive() {
  
  const [listOfOrdersInArchive, setListOfOrdersInArchive] = useState([]);

  const dispatch = useDispatch();

  //fetchs data from API (order in archive)
  const fetchingAllOrdersInArchive = () => {
    axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res=>setListOfOrdersInArchive(res.data.data.reverse()))
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data);
      }
    })
  }

  useEffect(()=>{    
    localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }));
    refreshFunction(dispatch, fetchingAllOrdersInArchive)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='containerForArchivePage'>
      <UpNavigation hide='hide'/>
        <ListOfArchive LIST={listOfOrdersInArchive} setList={setListOfOrdersInArchive} />
      <ContactWithUs />
    </div>
  )
}
