import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../Styles/SignUp.css'


export default function SignUp({setRegistr, setIsAuthorizate}) {
  
    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [SecondPasswordInputValue, setSecondPasswordInputValue] = useState('')
    const [TypeForFirstPasswordInput, setTypeForFirstPasswordInput] = useState('password')
    const [TypeForSecondPasswordInput, setTypeForSecondPasswordInput] = useState('password')
    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')

  const showPassword = ()=>{
    if(TypeForFirstPasswordInput == 'password'){
      setTypeForFirstPasswordInput('text')
    } else {
      setTypeForFirstPasswordInput('password')
    }
  }
  
  const showSecondPassword = ()=>{
    if(TypeForSecondPasswordInput == 'password'){
      setTypeForSecondPasswordInput('text')
    } else {
      setTypeForSecondPasswordInput('password')
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return (re.test(email));
  }

  const statusValidate = async()=>{
    if(validateEmail(LoginInputValue)){
        setStatusValidateForm('Отлично!');
        setColorOfValidateForm('good');
        return true
      } else {
        setStatusValidateForm('Вы ввели некорректный Email!');
        setColorOfValidateForm('bad')
        return false
     }
  }
   

  const Registration = async ()=> {
    let status = await statusValidate();
    if(PasswordInputValue === SecondPasswordInputValue && status){
        axios.defaults.withCredentials = true;
        let response = await axios
                              .post('https://api.hlofiys.tk/auth/register', 
                              {
                                 email: LoginInputValue,
                                 password: PasswordInputValue
                              })
        localStorage.setItem('accessToken', response.data.accessToken)
          setPasswordInputValue('');
          setLoginInputValue('');
          setSecondPasswordInputValue('');
          setStatusValidateForm('Вы успеешно зарегистрированы!');
          setColorOfValidateForm('yellow')
          setTimeout(()=>{
            setColorOfValidateForm('');
            setStatusValidateForm('')
          },4000)
          setIsAuthorizate(true)
    } else {
      console.log('1')
    }
  }
    

  return (
    <div className='ContainerForSignUp'>
        
        <div className='SignUp'>
            <h1>Регистрация</h1>
            <div className='ForInputs'>
                
                <input id='LoginInput' 
                       className='Input'  
                       onChange={(e)=>{
                                        setLoginInputValue(e.target.value);
                                        statusValidate()
                                      }} 
                       placeholder='Email' 
                       value={LoginInputValue}/>
                <span className={`StatusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
                <div className='PasswordField'>
                  <input id='PasswordInput' 
                         className='Input' 
                         onChange={(e)=>setPasswordInputValue(e.target.value)} 
                         type={`${TypeForFirstPasswordInput}`} placeholder='Password' 
                         value={PasswordInputValue}/>
                  <button onClick={showPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>
                <div className='PasswordField'>
                  <input id='SecondPasswordInput' 
                         className='Input' 
                         onChange={(e)=>setSecondPasswordInputValue(e.target.value)} 
                         type={`${TypeForSecondPasswordInput}`} 
                         placeholder='Please, repeat your password' 
                         value={SecondPasswordInputValue}/>
                  <button onClick={showSecondPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>

            </div>
            <p className='SignIn' onClick={()=>{setRegistr(false)}}>Войти</p>
            <button className='SignUpBTN' 
                    onClick={Registration}>Создать аккаунт</button>
        </div>
        <div className='ChangeField'>
            <p>Есть аккаунт? Тогда добро пожаловать!</p>
            <button className='SignInChangeBtn' 
                    onClick={()=>{
                                  setRegistr(false);
                                  }
                    }>Войти</button>
        </div>
    </div>
  )
}
