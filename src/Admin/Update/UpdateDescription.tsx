import React, { useState } from 'react';  
import { IUpdateDescriptionProps } from './Interfaces/Interface';
import { updateDescription } from '../AdmineController';
import { refreshFunction } from '../../MainFiles/App'
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import './Style/UpdateCSS.css';

const UpdateDescription: React.FC<IUpdateDescriptionProps> = (props: IUpdateDescriptionProps) => {
    
    const {isOpen, defaultDescription, setIsOpen} = props;

    const [description, setDescription] = useState<string>(defaultDescription);
    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateDescription(localStorage.getItem('searchOrderById') || '{}', description, dispatch);
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
            Изменить описание</h2>
        <textarea 
            className='updateTextarea'
            onChange={event=>setDescription(event.target.value)} 
            defaultValue={defaultDescription}
        /> 
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
export default UpdateDescription;