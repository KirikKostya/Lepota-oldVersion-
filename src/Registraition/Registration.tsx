import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Styles/Registration.css'

//shows passwords by chosen password-fields
export const showPassword = (inputType:string, setInputType:(str:string)=>void, setEyesState:(bool: boolean)=>void):void => {
  if(inputType === 'password'){
    setInputType('text');
    setEyesState(false);
  } else {
    setInputType('password');
    setEyesState(true);
  }
}

//checks login-email by validate pattern
export function validateEmail(email:string):boolean {
  let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/iu;
  return (re.test(email));
}

//shows status of validate fields
export const statusValidate = async (setStatusValidate:(str:string)=>void, setColorOfValidate:(str: string)=>void, LoginInputValue:string)=>{
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
export const clearInputs = (setLoginInput:(str: string)=>void, setPasswordInput:(str: string)=>void, setSecondPasswordInput:(str: string)=>void):void => {
  setLoginInput('');
  setPasswordInput('');
  setSecondPasswordInput('')
}

export default function Registration() {

  const [Registr, setRegistr] = useState<boolean>(true);

  return (
    <div className='containerForRegistration'>
      <div className='fieldEffect'></div>
        {
          (Registr)
              ? <SignUp setRegistr={setRegistr} />
                : <SignIn setRegistr={setRegistr} />
        }
    </div>
  )
}
