import React from 'react'
import ReactModal from 'react-modal'
import { NavLink } from 'react-router-dom'
import './Style/WarningModalView.css'

export default function WarningModalView({ WarningMessageIsOpen }) {
     
  return (
    <ReactModal 
            isOpen={WarningMessageIsOpen}
            ariaHideApp={false}
            contentLabel="Selected Option"
            >
        <h1>Внимание!</h1>
        <h2 
          style={{ textAlign: 'center'}}
        >Для того чтобы добавить товар в корзину, вам необходимо <NavLink to={'/Registration'}>войти</NavLink> в аккаунт!</h2>
    </ReactModal>
    )
}
