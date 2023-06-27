import React from 'react';
import { IOnClick } from '../Admin/Update/Interfaces/Interface';

const CameraIcon: React.FC<IOnClick> = (props) => {

  const { onClick } = props;

  return (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        onClick={onClick}> 
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/> 
            <circle cx="12" cy="13" r="3" /> 
            <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /> 
            <line x1="15" y1="6" x2="21" y2="6" /> 
            <line x1="18" y1="3" x2="18" y2="9" /> 
    </svg>
  )
}

export default CameraIcon;
