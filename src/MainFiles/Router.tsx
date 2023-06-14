import React from 'react'
import Main from './Main';
import Regist from '../Registration/Regist'
import Profile from '../MyAccountComponents/Profile'
import MyBasket from '../OrderBasket/MyBasket'
import OrdersArchive from '../OrderArchive/OrdersArchive';
import TypeCatalog from '../CatalogOfWorks/TypeCatalog'
import AccountActivation from '../Activation/AccountActivation';
import { Routes, Route, HashRouter} from 'react-router-dom'

const Router: React.FC = () => {

  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/Registration' element={<Regist />}/>
            <Route path='/Profile' element={<Profile />} />
            <Route path='/MyBasket' element={<MyBasket />} />
            <Route path='/OrdersArchive' element={<OrdersArchive />} />
            <Route path='/TypeCatalog' element={<TypeCatalog />} />
            <Route path='/Activation' element={<AccountActivation />} />
        </Routes>
    </HashRouter>
  )
}

export default Router;
