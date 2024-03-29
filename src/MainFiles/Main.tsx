import React from 'react';
import UpNavigation from '../Components/UpNavigation';
import TimingAndDelivery from '../Components/TimingAndDelivery';
import Description from '../Components/Description';
import AboutCompany from '../Components/AboutCompany';
import WorkCatalog from '../Components/WorkCatalog';
import AboutKashpo from '../Components/AboutKashpo';
import ContactWithUs from '../Components/ContactWithUs';
import './Styles/Main.css';

const Main: React.FC = () => {

  return (
    <div className='main'>   
      <UpNavigation hide={''} /> 
      <Description />
      <AboutCompany />
      <WorkCatalog />
      <TimingAndDelivery />
      <AboutKashpo />
      <ContactWithUs />
    </div>
  )
}

export default Main;
