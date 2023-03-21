import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showPassword, statusValidate, clearInputs } from './Registration';
import axios from 'axios'
import './Styles/SignIn.css'

export default function SignIn({ setRegistr }) {
  
    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [TypeOfPasswordInput, setTypeOfPasswordInput] = useState('password')
    const [closeEyesStatus, setCloseEyesStatus] = useState(true)
    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')

    const [buttonStatus, setButtonStatus] = useState('Войти');

    const dispatch = useDispatch()

    //authorizates user 
    const Authorization = async ()=> {
      let status = await statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue);
        if(PasswordInputValue && status){  
          axios.defaults.withCredentials = true;
          axios.post('https://api.native-flora.tk/Auth/Login', 
                {
                  'username': LoginInputValue,
                  'password': PasswordInputValue
                })
          .then( res=>{
            localStorage.setItem('accessToken', res.data.data);
            setStatusValidateForm('Вы вошли в свой аккаунт!');
            setColorOfValidateForm('green');
            dispatch({ type: 'COMPLETED_AUTHORIZATION'});
            clearInputs( setLoginInputValue, setPasswordInputValue, setPasswordInputValue );
            setButtonStatus('Перейти на главную');
          }) 
          .catch(err=>{
            console.log(err)
            setStatusValidateForm('Не верный логин или пароль!');
            setColorOfValidateForm('red');
            clearInputs( setLoginInputValue, setPasswordInputValue );
          })
              setTimeout(()=>{
                setColorOfValidateForm('');
                setStatusValidateForm('')
              }, 4000)

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
              <input 
                id='LoginInput' 
                className='Input' 
                type='email'
                autoComplete='off'
                  onChange={(e)=>{
                    setLoginInputValue(e.target.value);
                    statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue)
                  }} 
                placeholder='Login' 
                value={LoginInputValue}/>
              <span className={`StatusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
              <div className='PasswordField_SI'>
                <input 
                  id='PasswordInput' 
                  className='Input' 
                  onChange={(e)=>setPasswordInputValue(e.target.value)} 
                  type={`${TypeOfPasswordInput}`} 
                  placeholder='Password' 
                  value={PasswordInputValue}/>
                  
                  {
                    closeEyesStatus
                      ? <svg 
                            onClick={()=>showPassword(TypeOfPasswordInput, setTypeOfPasswordInput, setCloseEyesStatus)} 
                            width={23} 
                            height={23}
                            viewBox={'0 0 20 20'} 
                            fill='none'>
                          <path 
                            d='M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5'
                            stroke='#000' 
                            strokeLinecap='round' 
                            strokeLinejoin='round' />
                        </svg>
                          : <svg 
                                onClick={()=>showPassword(TypeOfPasswordInput, setTypeOfPasswordInput, setCloseEyesStatus)}  
                                width={23} 
                                height={23} 
                                viewBox={'0 0 20 20'} 
                                fill='none'>
                              <path d='M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z'
                                stroke='#000' 
                                strokeLinecap='round' 
                                strokeLinejoin='round' />
                            </svg>
                  }
                </div>
            </div>
            {
              buttonStatus === 'Войти'
                ? <button 
                    className='SignInBTN' 
                    onClick={Authorization}>{buttonStatus}</button>
                  : <NavLink 
                      className='NavLink SignInBTN'
                      to='/'>{buttonStatus}</NavLink>
            }
            <p 
              className='helpMessage_SI'
              onClick={()=>setRegistr(true)}>
            РЕГИСТИРОВАТЬСЯ
            </p>
        </div>
        <div className='ChangeField'>
          <p>У вас нет аккаунта? Зарегистрируйся!</p>
          <button 
            className='SignInChangeBtn' 
            onClick={()=>setRegistr(true)}>Регистрация</button>
        </div>
    </div>
  )
}
