import React, { useCallback, useEffect, useState } from 'react';
import UpNavigation from '../Components/UpNavigation.js'
import LoadingComp from '../Loading/LoadingComp.js';
import ListOfArchive from './ListOfArchive.js'
import ContactWithUs from '../Components/ContactWithUs.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Styles/OrdersArchive.css';

export default function OrdersArchive() {
  
  const [listOfOrdersInArchive, setListOfOrdersInArchive] = useState([]);

  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch();

  //fetchs data from API (order in archive)
  const fetchingAllOrdersInArchive = useCallback(() => {
    axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res=>{
      setListOfOrdersInArchive(res.data.data);
      dispatch({type: 'LOADING_IS_COMPLETED'});
    })
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data);
        dispatch({type: 'LOADING_IS_COMPLETED'});
      }
    })
  }, [dispatch])

  useEffect(()=>{
    const abortController = new AbortController();
    localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }))
    fetchingAllOrdersInArchive();
    return ()=>{
      abortController.abort()
    }
  }, [fetchingAllOrdersInArchive])

  return (
    <div className='containerForArchivePage'>
      <UpNavigation hide='hide'/>
      {
        isLoading
          ? <LoadingComp />
            : <ListOfArchive LIST={listOfOrdersInArchive} setList = {setListOfOrdersInArchive} />
      }
      <ContactWithUs />
    </div>
  )
}
