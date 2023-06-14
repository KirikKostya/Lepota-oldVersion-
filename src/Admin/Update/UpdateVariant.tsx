import React, {useEffect, useState} from 'react'
import { updateVariant } from '../AdmineController';
import { refreshFunction } from '../../MainFiles/App'
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import Picker from '../Picker';
import './Style/UpdateCSS.css';
import { IUpdateVariantProps } from './Interfaces/Interface';
import { FaChevronLeft } from 'react-icons/fa';

const UpdateVariant: React.FC<IUpdateVariantProps> = (props) => {
    
    const {isOpen, variant, setIsOpen} = props;

    const [variantPhotos, setVariantPhotos] = useState<string[]>([...variant.icon]);
    const [variantName, setVariantName] = useState<string>(variant.name);
    const [variantPrice, setVariantPrice] = useState<string>(variant.price);

    const dispatch = useDispatch();

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

    const handlerChange = async() =>{
        updateVariant(localStorage.getItem('searchOrderById') || '{}', variant.id, variantName, variantPrice, variantPhotos, dispatch);
        setIsOpen(false)
    }
    
  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>
            <FaChevronLeft 
                style={{width: '10px', marginRight: '10px'}} 
                onClick={()=>setIsOpen(false)}
            />
            Изменить вариант
        </h2>
        <div className='formContainer'>
            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} defaultValue={variant.name}/>
            <input placeholder='Цена' style={{width: '50px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)} defaultValue={variant.price}/>
            <Picker photos={variantPhotos} setPhotos={setVariantPhotos} style={styleForPicker} className={''}/>
        </div>
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN'
                onClick={()=>refreshFunction(dispatch, handlerChange) }
            >
                Изменить
            </button>
        </div>
    </ReactModal>
  )
}

export default UpdateVariant;