import React from 'react';
import ReactModal from 'react-modal';
import Slider from '../Slider/Slider';
import './Styles/AddedVariantModal.css';

export default function VariantPhotosModal({ isOpen, setIsOpen, IMGS }) {

  return (
    <ReactModal 
      isOpen={isOpen}
      ariaHideApp={false}
      contentLabel="Selected Option"
    >
      <Slider>
        {
          IMGS.map(img=>(
            <img key={img.url} src={ img.url } alt='something'/>
          ))
        }
      </Slider>
      <button 
          className='modal-closeBTN variantBtn' 
          onClick={()=>setIsOpen(false)}
      >закрыть</button>
    </ReactModal>
  )
}
