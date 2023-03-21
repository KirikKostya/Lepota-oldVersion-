import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom'
import Registration from './Components/Registration';
import Profile from './MyAccountComponents/Profile'
import MyBasket from './MyAccountComponents/MyBasket'
import OrdersArchive from './MyAccountComponents/OrdersArchive';
import TypeCatalog from './CatalogOfWorks/TypeCatalog'
import AccountActivation from './MyAccountComponents/AccountActivation';
import Main from './Main';
import axios from 'axios';
export default function Router() {

  return (
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Main/>} />
                </Routes> 
                <Routes>
                    <Route path='/Registration' element={<Registration />}/>
                </Routes>
                <Routes>
                    <Route path='/Profile' element={<Profile />} />
                </Routes>
                <Routes>
                    <Route path='/MyBasket' element={<MyBasket />} />
                </Routes>
                <Routes>
                    <Route path='/OrdersArchive' element={<OrdersArchive />} />
                </Routes>
                <Routes>
                    <Route path='/TypeCatalog' element={<TypeCatalog />} />
                </Routes>
                <Routes>
                    <Route path='/Activation' element={<AccountActivation />} />
                </Routes>
            </HashRouter>
  )
}
