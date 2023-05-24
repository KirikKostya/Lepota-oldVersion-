import React from 'react'
import { IOnClick } from '../Admin/Update/Interfaces/Interface'

export default function AddVariantIcon(props: IOnClick) {

  const {onClick} = props;
  
  return (
    <svg fill="none" width='20' height='20' viewBox="0 0 24 24" onClick={onClick}> 
        <path d="M3 3h14v14H3V3zm12 12V5H5v10h10zm-8 6v-2h12V7h2v14H7zm4-12h2v2h-2v2H9v-2H7V9h2V7h2v2z" fill="#1d78fe"/> 
    </svg>
  )
}
