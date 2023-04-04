import React from 'react'
import UpNavigation from '../Components/UpNavigation';
import Discription from '../Components/Discription';
import AboutCompany from '../Components/AboutCompany';
import WorkCatalog from '../Components/WorkCatalog';
import TimingAndDelivery from '../Components/TimingAndDelivery';
import AboutKashpo from '../Components/AboutKashpo';
import ContactWithUs from '../Components/ContactWithUs';
import './Styles/Main.css'

export default function Main() {
  return (
    <div className='Main'>        
        <UpNavigation />
        <Discription />
        <AboutCompany />
        <WorkCatalog />
        <TimingAndDelivery />
        <AboutKashpo />
        <ContactWithUs />
    </div>
  )
}