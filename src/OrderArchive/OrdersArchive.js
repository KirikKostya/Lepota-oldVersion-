import React, { useCallback, useEffect, useState } from 'react';
import UpNavigation from '../Components/UpNavigation.js'
import LoadingComp2 from '../Loading/LoadingComp2.js';
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
  }

  useEffect(()=>{
    const abortController = new AbortController();
    localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }))
    refreshFunction(dispatch, fetchingAllOrdersInArchive)
    return ()=>{
      abortController.abort()
    }
  }, [])

  return (
    <div className='containerForArchivePage'>
      <UpNavigation hide='hide'/>
      {
        isLoading
          ? <LoadingComp2 />
            : <ListOfArchive LIST={listOfOrdersInArchive} setList = {setListOfOrdersInArchive} />
      }
      <ContactWithUs />
    </div>
  )
}
