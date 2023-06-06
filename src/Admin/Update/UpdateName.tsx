import React, {useState} from 'react'
import { updateName } from '../AdmineController';
import { refreshFunction } from '../../MainFiles/App'
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import './Style/UpdateCSS.css'
import { IUpdateNameProps } from './Interfaces/Interface';

export default function UpdateName(props: IUpdateNameProps) {
    
    const {isOpen, defaultName, setIsOpen} = props;

    const [name, setName] = useState<string>(defaultName);
    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateName(localStorage.getItem('searchOrderById') || '{}', name, dispatch);
        setIsOpen(false)
    }

  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>Изменить название</h2>
        <input 
            className='updateInput'
            onChange={event => setName(event.target.value)} 
            defaultValue={defaultName}
        />
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
