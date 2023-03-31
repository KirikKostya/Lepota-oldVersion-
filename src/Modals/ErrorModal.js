import React from 'react'
import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'
import './Styles/WarningModalView.css'

export default function ErrorModal({ errorMessage, setErrorMessage, activationFunction }) {
    
    const dispatch = useDispatch()

  return (
    <ReactModal
        isOpen={Boolean(errorMessage)}
        ariaHideApp={false}
    >
        <h1 className='modal-header'>{errorMessage}</h1>
        {
            errorMessage === 'Такой аккаунт уже активирован!' || errorMessage === 'Вы активировали аккаунт!'
                ? <svg  width="60" 
                        height="60"
                        viewBox="0 0 512 512">
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176 128C158.3 128 144 156.7 144 192C144 227.3 158.3 256 176 256C193.7 256 208 227.3 208 192C208 156.7 193.7 128 176 128zM336 256C353.7 256 368 227.3 368 192C368 156.7 353.7 128 336 128C318.3 128 304 156.7 304 192C304 227.3 318.3 256 336 256z"/>
                  </svg>
                      : <svg width="60" 
                            height="60" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2" 
                            stroke="black" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"> 
                            <path stroke="none" 
                                    d="M0 0h24v24H0z" 
                                    fill="none"/> 
                            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" /> 
                            <path d="M4 16v2a2 2 0 0 0 2 2h2" /> 
                            <path d="M16 4h2a2 2 0 0 1 2 2v2" /> 
                            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" /> 
                            <path d="M9 10h.01" /> 
                            <path d="M15 10h.01" /> 
                            <path d="M9.5 15.05a3.5 3.5 0 0 1 5 0" /> 
                        </svg>
        }
        {
            errorMessage === 'Такой аккаунт уже активирован!' || errorMessage === 'Вы активировали аккаунт!'
                ? <a className='NavLink modal-closeBTN' href={'https://kirikkostya.github.io/Lepota/'}>продолжить</a>
                    : <button 
                        className='modal-closeBTN' 
                        onClick={()=>{
                            setErrorMessage('');
                            dispatch({type: 'LOADING_IS_UNCOMPLETED'})
                            activationFunction()
                        }}>повторить</button>
        }
    </ReactModal>
  )
}
