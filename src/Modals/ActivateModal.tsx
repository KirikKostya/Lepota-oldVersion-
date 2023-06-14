import React from 'react'
import ReactModal from 'react-modal'
import PositiveIconActivation from '../Icons/PositiveIconActivation'
import NagativeIconActivation from '../Icons/NagativeIconActivation'
import './Styles/WarningModalView.css'

interface IActivateModalProps{
    errorMessage: string, 
    setErrorMessage: (str: string)=>void, 
    activationFunction: ()=>void
}

const ActivateModal: React.FC<IActivateModalProps> = (props) => {

  const { errorMessage, setErrorMessage, activationFunction } = props;

  return (
    <ReactModal
        isOpen={Boolean(errorMessage)}
        ariaHideApp={false}
    >
        <h1 className='modal-header'>{errorMessage}</h1>
        {
            errorMessage === 'Такой аккаунт уже активирован!' || errorMessage === 'Вы активировали аккаунт!'
                ? <PositiveIconActivation />
                      : <NagativeIconActivation />
        }
        {
            errorMessage === 'Такой аккаунт уже активирован!' || errorMessage === 'Вы активировали аккаунт!'
                ? <a className='NavLink modal-closeBTN' href={'https://kirikkostya.github.io/Lepota/'}>продолжить</a>
                    : <button 
                        className='modal-closeBTN' 
                        onClick={()=>{
                            activationFunction();
                            setErrorMessage('');
                        }}>повторить</button>
        }
    </ReactModal>
  )
}

export default ActivateModal;