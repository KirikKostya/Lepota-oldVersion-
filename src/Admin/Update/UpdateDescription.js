import React, {useState} from 'react'
import { updateDescription } from '../AdmineController';
import { refreshFunction } from '../../MailFiles/App'
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import './Style/UpdateCSS.css'

export default function UpdateDescription({isOpen, defaultDescription, setIsOpen}) {

    const [description, setDescription] = useState(defaultDescription);
    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateDescription(localStorage.getItem('searchOrderById'), description, dispatch);
        setIsOpen(false)
    }

  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>Изменить описание</h2>
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
            <p
             onClick={()=>setIsOpen(false)}
             style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
