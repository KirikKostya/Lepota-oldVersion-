import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/MyAccount.css'

export default function MyAccount({isAuthorizate, setIsAuthorizate}) {
  return (
    <>
    
    {
      (isAuthorizate)
        ?<div className='ContainerForMyAccount'>
          <NavLink className='ListItem'>Мой аккаунт</NavLink>
          <NavLink className='ListItem'>Архив заказов</NavLink>
          <NavLink className='ListItem'>Карзина</NavLink>
          <NavLink onClick={()=>setIsAuthorizate(false)} className='Link'>Выйти</NavLink>
         </div>
          :<div className='ContainerForMyAccount'>
            <NavLink className='ListItem'>Мой аккаунт</NavLink>
            <NavLink className='ListItem'>Архив заказов</NavLink>
            <NavLink className='ListItem'>Карзина</NavLink>
            <NavLink to='/Registration' className='Link'>Регистрация</NavLink>
           </div>
    }
    
        
    </>
  )
}
