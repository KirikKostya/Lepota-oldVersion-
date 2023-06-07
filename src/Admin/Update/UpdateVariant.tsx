import React, {useEffect, useState} from 'react'
import { updateVariant } from '../AdmineController';
import { refreshFunction } from '../../MainFiles/App'
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import Picker from '../Picker';
import './Style/UpdateCSS.css';
import { IUpdateVariantProps } from './Interfaces/Interface';
import { IInitialState } from '../../ReduxToolkit/Interfaces';

export default function UpdateVariant(props: IUpdateVariantProps) {
    
    const {isOpen, variant, setIsOpen} = props;

    const [variantPhotos, setVariantPhotos] = useState<string[]>([...variant.icon]);
    const [variantName, setVariantName] = useState<string>(variant.name);
    const [variantPrice, setVariantPrice] = useState<string>(variant.price);

    const isAdmine = useSelector((state: IInitialState)=>state.isAdmine);

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
        <h2>Изменить вариант</h2>
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
            <p
             onClick={()=>setIsOpen(false)}
             style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
