import React from 'react'
import ReactModal from 'react-modal'
import { NavLink } from 'react-router-dom'

export default function WarningModalView({ WarningMessageIsOpen }) {

    const customStylesForModal = {
        content: {
          width: '50%',
          height: '60%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: '20px',
        },
    }
     
  return (
    <ReactModal 
            isOpen={WarningMessageIsOpen}
            ariaHideApp={false}
            contentLabel="Selected Option"
            style={customStylesForModal}>
        <h1>Внимание!</h1>
        <h2 style={
          {
            textAlign: 'center'
          }
        }>Для того чтобы добавить товар в корзину, вам необходимо <NavLink to={'/Registration'}>войти</NavLink> в аккаунт!</h2>
    </ReactModal>
    )
}
