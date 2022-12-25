import React, {useState, useEffect} from 'react';
import './App.css';
import UpNavigation from './Components/UpNavigation';
import Discription from './Components/Discription';
import AboutCompany from './Components/AboutCompany';
import WorkCatalog from './Components/WorkCatalog';
import TimingAndDelivery from './Components/TimingAndDelivery';
import AboutKashpo from './Components/AboutKashpo';
import ContactWithUs from './Components/ContactWithUs';

function App() {
  return (
    <div className="App">
      <UpNavigation />
      <Discription />
      <AboutCompany />
      <WorkCatalog />
      <TimingAndDelivery />
      <AboutKashpo />
      <ContactWithUs />
    </div>
  );
}

export default App;
