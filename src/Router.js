import React, {useState} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavAboutKashpo from './NavigationOnPage/NavAboutKashpo';
import NavContact from './NavigationOnPage/NavContact';
import Registration from './Components/Registration';
import Profile from './MyAccountComponents/Profile'
import MyBasket from './MyAccountComponents/MyBasket'
import PurchaseArchive from './MyAccountComponents/PurchaseArchive';
import TypeCatalog from './CatalogOfWorks/TypeCatalog'
import Main from './Main';
import NavTimming from './NavigationOnPage/NavTimming';
import NavCatalog from './NavigationOnPage/NavCatalog';


export default function Router() {
    
    const [isAuthorizate, setIsAuthorizate] = useState(localStorage.getItem('accessToken'))

  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main isAuthorizate = {isAuthorizate} 
                                               setIsAuthorizate = {setIsAuthorizate}/>} />
            </Routes>
            <Routes>
                <Route path='/WorkCatalog' element={<NavCatalog />} />
            </Routes>
            <Routes>
                <Route path='/TimingAndDelivery' element={<NavTimming />} />
            </Routes>
            <Routes>
                <Route path='/AboutKashpo' element={<NavAboutKashpo />} />
            </Routes>
            <Routes>
                <Route path='/ContactWithUs' element={<NavContact />} />
            </Routes> 
            <Routes>
                <Route path='/Registration' element={<Registration setIsAuthorizate = {setIsAuthorizate} />}/>
            </Routes>
            <Routes>
                <Route path='/Profile' element={<Profile />} />
            </Routes>
            <Routes>
                <Route path='/MyBasket' element={<MyBasket />} />
            </Routes>
            <Routes>
                <Route path='/PurchaseArchive' element={<PurchaseArchive />} />
            </Routes>
            <Routes>
                <Route path='/TypeCatalog' element={<TypeCatalog />} />
            </Routes>
        </BrowserRouter>
  )
}
