import React, { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Registration from './Components/Registration';
import Profile from './MyAccountComponents/Profile'
import MyBasket from './MyAccountComponents/MyBasket'
import GoodsArchive from './MyAccountComponents/GoodsArchive';
import TypeCatalog from './CatalogOfWorks/TypeCatalog'
import Main from './Main';
export default function Router() {
    
    const [catalogOrders, setCatalogOrders] = useState(Array);   
    const [OpenID, setOpenID] = useState(0)
    const [isBasketEmpty, setIsBasketEmpty] = useState(true)

    const fetchProducts = (OpenID) => {
      fetch(`https://api.native-flora.tk/Item/GetById?id=${OpenID}`)
        .then(res=>res.json())
        .then(res=>{
            if(res.data == null){
                setCatalogOrders(null)
            } else {
                setCatalogOrders([res.data])
            }
        })
    }

  return (
        <BrowserRouter>
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
                <Route path='/MyBasket' element={<MyBasket setIsBasketEmpty = {setIsBasketEmpty}/>} />
            </Routes>
            <Routes>
                <Route path='/GoodsArchive' element={<GoodsArchive />} />
            </Routes>
            <Routes>
                <Route path='/TypeCatalog' element={<TypeCatalog OpenID={OpenID} 
                                                                 setIsBasketEmpty = {setIsBasketEmpty}
                                                                 catalogOrders={catalogOrders}/>} />
            </Routes>
        </BrowserRouter>
  )
}
