import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom'
import Registration from './Components/Registration';
import Profile from './MyAccountComponents/Profile'
import MyBasket from './MyAccountComponents/MyBasket'
import GoodsArchive from './MyAccountComponents/GoodsArchive';
import TypeCatalog from './CatalogOfWorks/TypeCatalog'
import Main from './Main';
import axios from 'axios';
export default function Router() {
    
    const [catalogOrders, setCatalogOrders] = useState(Array);   
    const [OpenID, setOpenID] = useState(0)

    const fetchProducts = (OpenID) => {
        axios.get(`https://api.native-flora.tk/Item/GetById?id=${OpenID}`)
            .then(res=>{
                if(res.data == null){
                    setCatalogOrders(null)
                } else {
                    setCatalogOrders([res.data.data])
                }
            })
    }

  return (
            <HashRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Main fetchProducts={fetchProducts}/>} />
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
                    <Route path='/GoodsArchive' element={<GoodsArchive />} />
                </Routes>
                <Routes>
                    <Route path='/TypeCatalog' element={<TypeCatalog OpenID={OpenID} 
                                                                     catalogOrders={catalogOrders}/>} />
                </Routes>
            </HashRouter>
  )
}
