import React, {useState} from 'react'
import ReactModal from 'react-modal'
import Slider from '../Slider/Slider'
import Picker from './Picker';
import {createVariant} from './AdmineController.js'
import './Style/CreateVariantModal.css'
import { FaChevronLeft } from 'react-icons/fa';

export default function CreateVariantModal({isOpen, setIsOpen, setError, cleanSelectedOptions}) {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const [variantName, setVariantName] = useState('');
    const [variantPrice, setVariantPrice] = useState('');

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

  return (
    <ReactModal 
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        {
            addedPhotos.length != 0 
                ?  <Slider>
                      {
                        addedPhotos.map(img=>(
                            <img key={img} src={ img } alt='something'/>
                        ))
                      }
                    </Slider>
                    : <h2 className='addVariantHeader'><FaChevronLeft style={{width: '10px', marginRight: '10px'}} onClick={()=>setIsOpen(false)}/> Добавить вариант</h2>
        }
        <div className='createContainer'>
            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} />
            <input placeholder='Цена' style={{width: '60px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)}/>
            <Picker photos={addedPhotos} setPhotos={setAddedPhotos} style={styleForPicker} />
        </div>
        <button 
            className='modal-closeBTN variantBtn' 
            style={{margin: '15px 0 10px 0'}}
            onClick={async()=>{
                createVariant(localStorage.getItem('searchOrderById'), variantName, variantPrice, addedPhotos, setError);
                setIsOpen(false);
                cleanSelectedOptions()
            }}
        >
            создать
        </button>
    </ReactModal>
  )
}
