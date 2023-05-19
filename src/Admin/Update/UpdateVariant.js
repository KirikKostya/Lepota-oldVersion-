import React, {useState} from 'react'
import { updateVariant } from '../AdmineController';
import { refreshFunction } from '../../MailFiles/App'
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal'
import Picker from '../Picker';
import './Style/UpdateCSS.css'

export default function UpdateVariant({isOpen, variant, setIsOpen}) {

    const [variantPhotos, setVariantPhotos] = useState([...variant.icon]);
    const [variantName, setVariantName] = useState(variant.name);
    const [variantPrice, setVariantPrice] = useState(variant.price);

    const dispatch = useDispatch();

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

    const handlerChange = async() =>{
        updateVariant(localStorage.getItem('searchOrderById'), variant.id, variantName, variantPrice, variantPhotos, dispatch);
        setIsOpen(false)
    }
  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>Изменить вариант</h2>
        <div className='formContainer'>
            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} defaultValue={variant.name}/>
            <input placeholder='Цена' style={{width: '50px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)} defaultValue={variant.price}/>
            <Picker photos={variantPhotos} setPhotos={setVariantPhotos} style={styleForPicker}/>
        </div>
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN'
                onClick={()=>refreshFunction(dispatch, handlerChange) }
            >
                Изменить
            </button>
            <p
             onClick={()=>setIsOpen(false)}
             style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
