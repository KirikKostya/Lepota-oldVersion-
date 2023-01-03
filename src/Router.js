import React, {useState} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavAboutKashpo from './NavigationOnPage/NavAboutKashpo';
import NavContact from './NavigationOnPage/NavContact';
import Registration from './Components/Registration';
import Profile from './MyAccountComponents/Profile'
import MyBasket from './MyAccountComponents/MyBasket'
import GoodsArchive from './MyAccountComponents/GoodsArchive';
import TypeCatalog from './CatalogOfWorks/TypeCatalog'
import Main from './Main';
import NavTimming from './NavigationOnPage/NavTimming';
import NavCatalog from './NavigationOnPage/NavCatalog';

export default function Router({ isAuthorizate, setIsAuthorizate }) {
    
    const [OpenID, setOpenID] = useState(0)
    const [isBasketEmpty, setIsBasketEmpty] = useState(true)

  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main isAuthorizate = {isAuthorizate} 
                                               setIsAuthorizate = {setIsAuthorizate}
                                               setOpenID={setOpenID}/>} />
            </Routes>
            <Routes>
                <Route path='/WorkCatalog' element={<NavCatalog  setOpenID={setOpenID}/>} />
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
                <Route path='/MyBasket' element={<MyBasket isAuthorizate={isAuthorizate} 
                                                           setIsAuthorizate = {setIsAuthorizate}
                                                           setIsBasketEmpty = {setIsBasketEmpty}/>} />
            </Routes>
            <Routes>
                <Route path='/GoodsArchive' element={<GoodsArchive />} />
            </Routes>
            <Routes>
                <Route path='/TypeCatalog' element={<TypeCatalog OpenID={OpenID} setIsBasketEmpty = {setIsBasketEmpty}/>} />
            </Routes>
        </BrowserRouter>
  )
}
