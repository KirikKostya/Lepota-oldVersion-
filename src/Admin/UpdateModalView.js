import React from 'react'
import ReactModal from 'react-modal'
import '../Modals/Styles/WarningModalView.css'

export default function UpdateModalView({type, setUpdateModalViewType}) {
  return (
    <ReactModal 
        isOpen={type == '' ? false : true }
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        {
            type === 'name'
                ? <input/>
                    : type === 'discription' 
                        ? <textarea /> 
                            : type === 'metric'
                                ? <input />
                                    :   <>
                                            var
                                        </>
        }
        <button 
            className='modal-closeBTN' 
            onClick={() => setUpdateModalViewType('')}
        >
            Изменить
        </button>
    </ReactModal>
  )
}
