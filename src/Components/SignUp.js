import React, {useState} from 'react'
import { showPassword, statusValidate, clearInputs } from './Registration';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Styles/SignUp.css'


export default function SignUp({ setRegistr }) {

    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [SecondPasswordInputValue, setSecondPasswordInputValue] = useState('')

    const [TypeForFirstPasswordInput, setTypeForFirstPasswordInput] = useState('password')
    const [closeFirstEyes, setCloseFirstEyes] = useState(true);
    const [TypeForSecondPasswordInput, setTypeForSecondPasswordInput] = useState('password')
    const [closeSecondEyes, setCloseSecondEyes] = useState(true);

    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')


  const dispatch = useDispatch()

  const Registration = async ()=> {
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
  }

  return (
    <div className='ContainerForSignUp'>
        
        <div className='SignUp'>
            <h1>Регистрация</h1>
            <div className='ForInputs'>
                
                <input id='LoginInput' 
                       className='Input' 
                       autoComplete='off'
                       onChange={(e)=>{
                                        setLoginInputValue(e.target.value);
                                        statusValidate(setStatusValidateForm, setColorOfValidateForm, LoginInputValue)
                                      }} 
                       placeholder='Email' 
                       value={LoginInputValue}/>
                <span className={`StatusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
                <div className='PasswordField'>
                  <input id='PasswordInput' 
                         className='Input' 
                         autoComplete='off'
                         onChange={(e)=>setPasswordInputValue(e.target.value)} 
                         type={`${TypeForFirstPasswordInput}`} placeholder='Password' 
                         value={PasswordInputValue}/>
                  {
                    closeFirstEyes
                      ? <svg onClick={()=>showPassword(TypeForFirstPasswordInput, setTypeForFirstPasswordInput, setCloseFirstEyes)} 
                             width={23} height={23} viewBox={'0 0 20 20'} fill='none'>
                          <path d='M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5'
                                stroke='#000' 
                                strokeLinecap='round' 
                                strokeLinejoin='round' />
                        </svg>
                        : <svg onClick={()=>showPassword(TypeForFirstPasswordInput, setTypeForFirstPasswordInput, setCloseFirstEyes)}  
                                    width={23} height={23} viewBox={'0 0 20 20'} fill='none'>
                            <path d='M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z'
                                stroke='#000' 
                                strokeLinecap='round' 
                                strokeLinejoin='round' />
                          </svg>
                  }
                </div>
                <div className='PasswordField'>
                  <input id='SecondPasswordInput' 
                         className='Input' 
                         onChange={(e)=>setSecondPasswordInputValue(e.target.value)} 
                         type={`${TypeForSecondPasswordInput}`} 
                         placeholder='Please, repeat password' 
                         value={SecondPasswordInputValue}/>
                  {
                    closeSecondEyes
                      ? <svg onClick={()=>showPassword(TypeForSecondPasswordInput, setTypeForSecondPasswordInput, setCloseSecondEyes)} 
                             width={23} height={23} viewBox={'0 0 20 20'} fill='none'>
                          <path d='M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5'
                                stroke='#000' 
                                strokeLinecap='round' 
                                strokeLinejoin='round' />
                        </svg>
                        : <svg onClick={()=>showPassword(TypeForSecondPasswordInput, setTypeForSecondPasswordInput, setCloseSecondEyes)} 
                               width={23} height={23} viewBox={'0 0 20 20'} fill='none'>
                            <path d='M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z'
                                stroke='#000' 
                                strokeLinecap='round' 
                                strokeLinejoin='round' />
                          </svg>
                  }
                </div>

            </div>
            <button className={`SignUpBTN`} 
                    onClick={Registration}>Создать аккаунт</button>
            <p className='helpMessage'>Есть аккаунт? 
              <span onClick={()=>setRegistr(false)}>ВОЙТИ</span>
            </p>
        </div>
        <div className='ChangeField'>
            <p>Есть аккаунт? Тогда добро пожаловать!</p>
            <button className='SignInChangeBtn' 
                    onClick={()=>setRegistr(false)}>Войти</button>
        </div>
    </div>
  )
}
