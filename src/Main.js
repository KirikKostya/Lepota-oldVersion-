import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Main.css'
import UpNavigation from './Components/UpNavigation';
import Discription from './Components/Discription';
import AboutCompany from './Components/AboutCompany';
import WorkCatalog from './Components/WorkCatalog';
import TimingAndDelivery from './Components/TimingAndDelivery';
import AboutKashpo from './Components/AboutKashpo';
import ContactWithUs from './Components/ContactWithUs';

export default function Main( { setOpenID, fetchProducts} ) {

    const [opacity, setOpacity ] = useState('');

  return (
        <div className='Main'>        
            <UpNavigation setOpacity={setOpacity}/>
            <Discription />
            <AboutCompany />
            <WorkCatalog setOpenID={setOpenID} fetchProducts={fetchProducts}/>
            <TimingAndDelivery />
            <AboutKashpo />
            <ContactWithUs /> 
        </div>
  )
}
