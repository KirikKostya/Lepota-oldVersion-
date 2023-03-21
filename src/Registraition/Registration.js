import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Styles/Registration.css'

//shows passwords by chosen password-fields
export const showPassword = (inputType, setInputType, setEyesState) => {
  if(inputType === 'password'){
    setInputType('text');
    setEyesState(false);
  } else {
    setInputType('password');
    setEyesState(true);
  }
}

//checks login-email by validate pattern
export function validateEmail(email) {
  let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/iu;
  return (re.test(email));
}

//shows status of validate fields
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

//clears all inputs on the registration(authorization)
export const clearInputs = (setLoginInput, setPasswordInput, setSecondPasswordInput) => {
  setLoginInput('');
  setPasswordInput('');
  setSecondPasswordInput('')
}

export default function Registration() {

  const [Registr, setRegistr] = useState(true);

  return (
    <div className='ContainerForRegistration'>
        <div className='FieldEffect'></div>
            {
            (Registr)
                ? <SignUp setRegistr={setRegistr} />
                  : <SignIn setRegistr={setRegistr} />
            }
        
        
    </div>
  )
}
