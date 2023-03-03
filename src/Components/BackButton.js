import React from 'react'
import { NavLink } from 'react-router-dom'
import './Styles/BackButton.css'

export default function BackButton({ Link }) {
  return (
    <div className='BackButton'>
        <NavLink className='NavLink' to={`${Link}`}>&#11013;</NavLink>  
    </div>
  )
}
