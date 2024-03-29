import React from 'react';
import { IOnClick } from '../Admin/Update/Interfaces/Interface';

export const CloseEyeIcons: React.FC<IOnClick> = (props) => {
  
  const { onClick } = props;

  return (
    <svg 
        onClick={onClick} 
        width={23} 
        height={23}
        viewBox={'0 0 20 20'} 
        fill='none'>
        <path 
            d='M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5'
            stroke='#000' 
            strokeLinecap='round' 
            strokeLinejoin='round' />
    </svg>
  )
}

export const OpenEyeIcons: React.FC<IOnClick> = (props:IOnClick) => {

  const { onClick } = props;

  return (
    <svg 
        onClick={onClick}  
        width={23} 
        height={23} 
        viewBox={'0 0 20 20'} 
        fill='none'>
        <path d='M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z'
            stroke='#000' 
            strokeLinecap='round' 
            strokeLinejoin='round' />
    </svg>
    )
}

export default [CloseEyeIcons, OpenEyeIcons];