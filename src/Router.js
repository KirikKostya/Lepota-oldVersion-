import React, {useState} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import UpNavigation from './Components/UpNavigation';
import Discription from './Components/Discription';
import AboutCompany from './Components/AboutCompany';
import WorkCatalog from './Components/WorkCatalog';
import TimingAndDelivery from './Components/TimingAndDelivery';
import AboutKashpo from './Components/AboutKashpo';
import ContactWithUs from './Components/ContactWithUs';
import Registration from './Components/Registration';


export default function Router() {
    
    const [isAuthorizate, setIsAuthorizate] = useState(false)

  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<UpNavigation  isAuthorizate = {isAuthorizate} 
                                                        setIsAuthorizate = {setIsAuthorizate}/>} />
            </Routes>
            <Routes>
                <Route path='/' element={<Discription />} />
            </Routes>
            <Routes>
                <Route path='/' element={<AboutCompany />} />
            </Routes>
            <Routes>
                <Route path='/' element={<WorkCatalog />} />
            </Routes>
            <Routes>
                <Route path='/' element={<TimingAndDelivery />} />
            </Routes>
            <Routes>
                <Route path='/' element={<AboutKashpo />} />
            </Routes>
            <Routes>
                <Route path='/' element={<ContactWithUs />} />
            </Routes>
            <Routes>
                <Route path='/Registration' element={<Registration setIsAuthorizate = {setIsAuthorizate}
                                                                    
                                                                    />}/>
            </Routes>
            
        </BrowserRouter>
  )
}
