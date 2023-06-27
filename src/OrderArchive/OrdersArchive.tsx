import React, { useEffect, useMemo, useState } from 'react';
import { IOrderArchiveType } from '../Admin/Update/Interfaces/Interface.js';
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { refreshFunction } from '../MainFiles/App';
import { useDispatch } from 'react-redux';
import ContactWithUs from '../Components/ContactWithUs';
import UpNavigation from '../Components/UpNavigation'
import ListOfArchive from './ListOfArchive';
import axios from 'axios';
import './Styles/OrdersArchive.css';


const OrdersArchive: React.FC = () => {
  
  const [listOfOrdersInArchive, setListOfOrdersInArchive] = useState<IOrderArchiveType[]>([]);

  const dispatch = useDispatch();

  //fetchs data from API (order in archive)
  const fetchingAllOrdersInArchive = () => {
    dispatch(loadingUncomplate())
    axios.get('https://api.native-flora.tk/Order/All', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(res=>{
      setListOfOrdersInArchive(res.data.data.reverse())
      dispatch(loadingComplate())
    })
    .catch(err=>{
      if(err.response.status === 400){
        setListOfOrdersInArchive(err.response.data.data);
      }
      dispatch(loadingComplate())
    })
  }

  const renderListOfArchiveElements = useMemo(()=>{
    
    return(
      <ListOfArchive LIST={listOfOrdersInArchive} setList={setListOfOrdersInArchive} />
    )
    
  }, [listOfOrdersInArchive])

  useEffect(()=>{    
    localStorage.setItem('filterMetric', JSON.stringify({ date: '', deliveType: '', deliveStatus: '' }));
    refreshFunction(dispatch, fetchingAllOrdersInArchive)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='containerForArchivePage'>
      <UpNavigation hide='hide'/>
        {renderListOfArchiveElements}
      <ContactWithUs />
    </div>
  )
}

export default OrdersArchive;