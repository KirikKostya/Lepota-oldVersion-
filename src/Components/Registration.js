import React, { useState } from 'react'
import BackButton from './BackButton';
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Styles/Registration.css'

export const showPassword = (inputType, setInputType, setEyesState) => {
  if(inputType === 'password'){
    setInputType('text');
    setEyesState(false);
  } else {
    setInputType('password');
    setEyesState(true);
  }
}

export function validateEmail(email) {
  let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/iu;
  return (re.test(email));
}

export const statusValidate = async (setStatusValidate, setColorOfValidate, LoginInputValue)=>{
  if(validateEmail(LoginInputValue)){
      setStatusValidate('Отлично!');
      setColorOfValidate('green')
      return true
    } else {
      setStatusValidate('Вы ввели некорректный Email!');
      setColorOfValidate('red')
      return false
   }
}

export const clearInputs = (setLoginInput, setPasswordInput, setSecondPasswordInput) => {
  setLoginInput('');
  setPasswordInput('');
  setSecondPasswordInput('')
}

export default function Registration() {

    const [Registr, setRegistr] = useState(true);

  return (
    <div className='ContainerForRegistration'>
        <BackButton Link='/'/>
        <div className='FieldEffect'></div>
            {
            (Registr)
                ? <SignUp setRegistr={setRegistr} />
                  : <SignIn setRegistr={setRegistr} />
            }
        
        
    </div>
  )
}
