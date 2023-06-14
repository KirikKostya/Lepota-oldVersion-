import React from 'react'
import { IOnClick } from '../Admin/Update/Interfaces/Interface'

const OrderCardMoreImgs: React.FC<IOnClick> = (props) => {

  const { onClick } = props;

  return (
    <svg width={25} 
         height={25} 
         viewBox={'0 0 24 24'} 
         fill={'none'}
         onClick={onClick}>
        <path 
            d='M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z' 
            stroke='#000'
            strokeWidth={2}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
        />
    </svg>
  )
}

export default OrderCardMoreImgs;