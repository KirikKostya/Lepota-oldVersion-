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
        <h1 className='modal-header'>Внимание!</h1>
        <p className='modal-errorMessage'
        >Для того чтобы добавить товар в корзину, вам необходимо <NavLink to={'/Registration'}>войти</NavLink> в аккаунт!</p>
    </ReactModal>
    )
}
