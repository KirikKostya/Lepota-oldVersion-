import React, { useState } from 'react'
import { IUpdateNameProps } from './Interfaces/Interface';
import { refreshFunction } from '../../MainFiles/App'
import { updateName } from '../AdmineController';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import './Style/UpdateCSS.css'

const UpdateName: React.FC<IUpdateNameProps> = (props) => {
    
    const { isOpen, defaultName, defaultPrice, setIsOpen } = props;

    const [name, setName] = useState<string>(defaultName);
    const [price, setPrice] = useState<string>(defaultPrice);

    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateName(localStorage.getItem('searchOrderById') || '{}', name, price, dispatch);
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
            Изменить название и цену</h2>
        <form>
            <input 
                className='updateName'
                onChange={event => setName(event.target.value)} 
                defaultValue={defaultName}
                />
            <input 
                className='updatePrice'
                onChange={event => setPrice(event.target.value)} 
                defaultValue={defaultPrice}
                />
        </form>
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

export default UpdateName;