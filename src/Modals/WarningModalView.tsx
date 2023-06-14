import React from 'react'
import ReactModal from 'react-modal'
import { NavLink } from 'react-router-dom'
import './Styles/WarningModalView.css'

interface IWarningModalViewProps{
  warningMessageIsOpen: boolean
  header: string
  children?: React.ReactNode 
}
const WarningModalView: React.FC<IWarningModalViewProps> = (props) => {
    
  const {warningMessageIsOpen, header, children} = props

  return (
    <ReactModal 
      isOpen={warningMessageIsOpen}
      ariaHideApp={false}
      contentLabel="Selected Option"
    >
      <h1 className='modal-header'>{header}</h1>
      <p className='modal-errorMessage'>
        {children}
      </p>
    </ReactModal>
    )
}

export default WarningModalView;