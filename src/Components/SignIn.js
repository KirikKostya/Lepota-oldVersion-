import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import './Styles/SignIn.css'

export default function SignIn({ setRegistr }) {
  
    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [TypeOfPasswordInput, setTypeOfPasswordInput] = useState('password')
    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')


    const dispatch = useDispatch()

  const showPassword = ()=>{
    (TypeOfPasswordInput == 'password')
      ? setTypeOfPasswordInput('text')
        : setTypeOfPasswordInput('password')
  }

  function validateEmail(email) {
    let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/iu;
    return (re.test(email));
  }

  const statusValidate = async ()=>{
    if(validateEmail(LoginInputValue)){
        setStatusValidateForm('Отлично!');
        setColorOfValidateForm('green')
        return true
      } else {
        setStatusValidateForm('Вы ввели некорректный Email!');
        setColorOfValidateForm('red')
        return false
     }
  }

  const Authorization = async ()=> {
    let status = await statusValidate();
    if(PasswordInputValue && status){  
      axios.defaults.withCredentials = true;
      axios.post('https://api.native-flora.tk/Auth/Login', 
            {
               'username': LoginInputValue,
                'password': PasswordInputValue
            })
      .then(res=>{
        localStorage.setItem('accessToken', res.data.data);
        setStatusValidateForm('Вы вошли в свой аккаунт!');
        setColorOfValidateForm('green')
        dispatch({ type: 'COMPLETED_AUTHORIZATION'});
        setPasswordInputValue('');
        setLoginInputValue('');
      }) 
      .catch(err=>{
        setStatusValidateForm('Не верный логин или пароль!');
        setColorOfValidateForm('red');
        setPasswordInputValue('');
        setLoginInputValue('');
      })
          setTimeout(()=>{
            setColorOfValidateForm('');
            setStatusValidateForm('')
          },4000)

        } else {
          setStatusValidateForm('Введите корректные логин и пароль');
          setColorOfValidateForm('red')
        }
  }
   
  return (
    <div className='ContainerForSignIn'>
        
        <div className='SignIn'>
            <h1>Войти</h1>
            <div className='ForInputs'>
                
                <input id='LoginInput' 
                       className='Input' 
                       type='email'
                       autoComplete='off'
                       onChange={(e)=>{
                                        setLoginInputValue(e.target.value);
                                        statusValidate()
                                      }} 
                       placeholder='Login' 
                       value={LoginInputValue}/>
                <span className={`StatusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
                <div className='PasswordField_SI'>
                  <input id='PasswordInput' 
                         className='Input' 
                         onChange={(e)=>setPasswordInputValue(e.target.value)} 
                         type={`${TypeOfPasswordInput}`} 
                         placeholder='Password' 
                         value={PasswordInputValue}/>
                  <button onClick={showPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>

            </div>
            <button 
              className='SignInBTN' 
              onClick={Authorization}>Войти</button>
            <p className='helpMessage_SI'
               onClick={()=>setRegistr(true)}>
                РЕГИСТИРОВАТЬСЯ
            </p>
        </div>
        <div className='ChangeField'>
          <p>У вас нет аккаунта? Зарегистрируйся!</p>
          <button className='SignInChangeBtn' 
                  onClick={()=>setRegistr(true)}>Регистрация</button>
        </div>
    </div>
  )
}
