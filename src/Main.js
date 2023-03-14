import React from 'react'
import UpNavigation from './Components/UpNavigation';
import Discription from './Components/Discription';
import AboutCompany from './Components/AboutCompany';
import WorkCatalog from './Components/WorkCatalog';
import TimingAndDelivery from './Components/TimingAndDelivery';
import AboutKashpo from './Components/AboutKashpo';
import ContactWithUs from './Components/ContactWithUs';
import './Main.css'

export default function Main( { setOpenID, fetchProducts} ) {
  return (
        <div className='Main'>        
            <UpNavigation/>
            <Discription />
            <AboutCompany />
            <WorkCatalog setOpenID={setOpenID} fetchProducts={fetchProducts}/>
            <TimingAndDelivery />
            <AboutKashpo />
            <ContactWithUs />
        </div>
  )
}
