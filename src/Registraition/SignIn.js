import React, { useState } from 'react'
import { showPassword, statusValidate, clearInputs } from './Registration';
import { CloseEyeIcons, OpenEyeIcons } from '../Icons/EyesIcons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    dispatch({type: 'LOADING_IS_UNCOMPLETED'});
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
    dispatch({type: 'LOADING_IS_COMPLETED'});
  }
   
  return (
    <div className='containerForSignIn'>
        <div className='signIn'>
            <h1>Войти</h1>
            <div className='forInputs'>
              <input 
                className='input' 
                type='email'
                autoComplete='off'
                  onChange={(e)=>{
                    setLoginInputValue(e.target.value);
                    statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue)
                  }} 
                placeholder='Login' 
                value={LoginInputValue}/>
              <span className={`statusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
              <div className='passwordField_SI'>
                <input 
                  className='input' 
                  onChange={(e)=>setPasswordInputValue(e.target.value)} 
                  type={`${TypeOfPasswordInput}`} 
                  placeholder='Password' 
                  value={PasswordInputValue}/>
                  {
                    closeEyesStatus
                      ? <CloseEyeIcons onClick={()=>showPassword(TypeOfPasswordInput, setTypeOfPasswordInput, setCloseEyesStatus)}/>
                          : <OpenEyeIcons onClick={()=>showPassword(TypeOfPasswordInput, setTypeOfPasswordInput, setCloseEyesStatus)}/>
                  }
                </div>
            </div>
            {
              buttonStatus === 'Войти'
                ? <button 
                    className='signInBTN' 
                    onClick={Authorization}>{buttonStatus}</button>
                  : <NavLink 
                      className='NavLink signInBTN'
                      to='/'>{buttonStatus}</NavLink>
            }
            <p 
              className='helpMessage_SI'
              onClick={()=>setRegistr(true)}>
            РЕГИСТИРОВАТЬСЯ
            </p>
        </div>
        <div className='changeField'>
          <p>У вас нет аккаунта? Зарегистрируйся!</p>
          <button 
            className='signInChangeBtn' 
            onClick={()=>setRegistr(true)}>Регистрация</button>
        </div>
    </div>
  )
}
