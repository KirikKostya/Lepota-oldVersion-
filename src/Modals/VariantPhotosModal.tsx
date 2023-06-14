import React from 'react';
import ReactModal from 'react-modal';
import Slider from '../Slider/Slider';
import './Styles/AddedVariantModal.css';

interface IVariantsPhotos{
  isOpen: boolean,
  setIsOpen: (bool: boolean)=>void;
  IMGS: IImgs[]
}
interface IImgs{
  url: string
}

const VariantPhotosModal: React.FC<IVariantsPhotos> = (props) => {

  const { isOpen, setIsOpen, IMGS } = props;

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

export default VariantPhotosModal;