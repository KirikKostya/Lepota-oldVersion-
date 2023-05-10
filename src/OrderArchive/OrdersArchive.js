import React, { useEffect, useState } from 'react';
import UpNavigation from '../Components/UpNavigation.js'
import ListOfArchive from './ListOfArchive.js'
import ContactWithUs from '../Components/ContactWithUs.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Styles/OrdersArchive.css';
import { refreshFunction } from '../MailFiles/App.js';

export default function OrdersArchive() {
  
  const [listOfOrdersInArchive, setListOfOrdersInArchive] = useState([]);

  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  //fetchs data from API (order in archive)
  const fetchingAllOrdersInArchive = () => {
    axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res => setListOfOrdersInArchive(res.data.data))
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data);
      }
    })
    dispatch({type: 'LOADING_IS_COMPLETED'});
  }

  useEffect(()=>{    
    localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }));
    dispatch({type: 'LOADING_IS_UNCOMPLETED'});
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
