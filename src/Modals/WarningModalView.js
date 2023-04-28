import React from 'react'
import ReactModal from 'react-modal'
import { NavLink } from 'react-router-dom'
import './Styles/WarningModalView.css'

export default function WarningModalView({ warningMessageIsOpen }) {
     
  return (
    <ReactModal 
            isOpen={warningMessageIsOpen}
            ariaHideApp={false}
            contentLabel="Selected Option"
            >
        <h1 className='modal-header'>Внимание!</h1>
        <p className='modal-errorMessage'>
          Для того чтобы добавить товар в корзину, вам необходимо 
          <NavLink className={'linkToRegistration'} to={'/Registration'}> войти </NavLink>
          в аккаунт!
        </p>
    </ReactModal>
    )
}
