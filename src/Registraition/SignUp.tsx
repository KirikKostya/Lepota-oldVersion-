import React, {useState} from 'react'
import { showPassword, statusValidate, clearInputs } from './Registration';
import { CloseEyeIcons, OpenEyeIcons } from '../Icons/EyesIcons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Styles/SignUp.css'


export default function SignUp({ setRegistr }) {

    const [LoginInputValue, setLoginInputValue] = useState<string>('');
    const [PasswordInputValue, setPasswordInputValue] = useState<string>('');
    const [SecondPasswordInputValue, setSecondPasswordInputValue] = useState<string>('')

    const [TypeForFirstPasswordInput, setTypeForFirstPasswordInput] = useState<string>('password')
    const [closeFirstEyes, setCloseFirstEyes] = useState<boolean>(true);
    const [TypeForSecondPasswordInput, setTypeForSecondPasswordInput] = useState<string>('password')
    const [closeSecondEyes, setCloseSecondEyes] = useState<boolean>(true);

    const [StatusValidateForm, setStatusValidateForm] = useState<string>('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState<string>('bad')


  const dispatch = useDispatch()

  //Registers user
  const Registration = async ()=> {
    dispatch({type: 'LOADING_IS_UNCOMPLETED'});
    let status = await statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue);
      if(PasswordInputValue === SecondPasswordInputValue && PasswordInputValue != '' && status){
        axios.defaults.withCredentials = true;
        axios
          .post('https://api.native-flora.tk/Auth/Register', 
              {
                 'username': LoginInputValue,
                 'password': PasswordInputValue
              })
          .then(res=>{
              setStatusValidateForm('Ссылка на подтверждение отпралена на почту!');
              setColorOfValidateForm('green');
              clearInputs( setLoginInputValue, setPasswordInputValue, setSecondPasswordInputValue );
              dispatch({ type: 'COMPLETED_AUTHORIZATION'})
                setTimeout(()=>{
                  setColorOfValidateForm('');
                  setStatusValidateForm('');
                }, 4000)
          })
          .catch(err=>{
            if(err.response.status === 400){
              setStatusValidateForm('Такой пользователь уже существует !');
              setColorOfValidateForm('red');
            }
          })
      } else {
        setStatusValidateForm('Введите корректные логин и пароль');
        setColorOfValidateForm('red');
      }
    dispatch({type: 'LOADING_IS_COMPLETED'});
  }

  return (
    <div className='containerForSignUp'>
        <div className='signUp'>
            <h1>Регистрация</h1>
            <div className='forInputs'>
              <input 
                className='input' 
                autoComplete='off'
                onChange={(e)=>{
                    setLoginInputValue(e.target.value);
                    statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue)
                  }} 
                placeholder='Email' 
                value={LoginInputValue}/>
              <span className={`statusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
              <div className='passwordField'>
                <input 
                  className='input' 
                  autoComplete='off'
                  onChange={(e)=>setPasswordInputValue(e.target.value)} 
                  type={`${TypeForFirstPasswordInput}`} 
                  placeholder='Password' 
                  value={PasswordInputValue}/>
                  {
                    closeFirstEyes
                      ? <CloseEyeIcons onClick={()=>showPassword(TypeForFirstPasswordInput, setTypeForFirstPasswordInput, setCloseFirstEyes)} />
                        : <OpenEyeIcons onClick={()=>showPassword(TypeForFirstPasswordInput, setTypeForFirstPasswordInput, setCloseFirstEyes)} />
                  }
              </div>
              <div className='passwordField'>
                <input 
                  className='input' 
                  onChange={(e)=>setSecondPasswordInputValue(e.target.value)} 
                  type={`${TypeForSecondPasswordInput}`} 
                  placeholder='Please, repeat password' 
                  value={SecondPasswordInputValue}/>
                  {
                    closeSecondEyes
                      ? <CloseEyeIcons onClick={()=>showPassword(TypeForSecondPasswordInput, setTypeForSecondPasswordInput, setCloseSecondEyes)} />
                      : <OpenEyeIcons onClick={()=>showPassword(TypeForSecondPasswordInput, setTypeForSecondPasswordInput, setCloseSecondEyes)} />
                  }
                </div>
            </div>
            <button 
              className={`signUpBTN`} 
              onClick={Registration}>Создать аккаунт</button>
            <p className='helpMessage'>
              Есть аккаунт? 
              <span onClick={()=>setRegistr(false)}>ВОЙТИ</span>
            </p>
        </div>
        <div className='changeField'>
            <p>Есть аккаунт? Тогда добро пожаловать!</p>
            <button 
              className='signInChangeBtn' 
              onClick={()=>setRegistr(false)}>Войти</button>
        </div>
    </div>
  )
}
