import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Styles/SignUp.css'


export default function SignUp({ setRegistr }) {

    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [SecondPasswordInputValue, setSecondPasswordInputValue] = useState('')
    const [TypeForFirstPasswordInput, setTypeForFirstPasswordInput] = useState('password')
    const [TypeForSecondPasswordInput, setTypeForSecondPasswordInput] = useState('password')
    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')


    const dispatch = useDispatch()
    
  const showPassword = ()=>{
    (TypeForFirstPasswordInput == 'password')
      ? setTypeForFirstPasswordInput('text')
        : setTypeForFirstPasswordInput('password')
  }
  
  const showSecondPassword = ()=>{
    if(TypeForSecondPasswordInput == 'password'){
      setTypeForSecondPasswordInput('text')
    } else {
      setTypeForSecondPasswordInput('password')
    }
  }

  function validateEmail(email) {
    let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return (re.test(email));
  }

  const statusValidate = async()=>{
    if(validateEmail(LoginInputValue)){
        setStatusValidateForm('Отлично!');
        setColorOfValidateForm('green');
        return true
      } else {
        setStatusValidateForm('Вы ввели некорректный Email!');
        setColorOfValidateForm('red')
        return false
     }
  }
   

  const Registration = async ()=> {
    let status = await statusValidate();
    if(PasswordInputValue === SecondPasswordInputValue && PasswordInputValue != '' && status){
        axios.defaults.withCredentials = true;
        let response = await axios
                              .post('https://api.native-flora.tk/Auth/Register', 
                              {
                                 'username': LoginInputValue,
                                 'password': PasswordInputValue
                              })
        localStorage.setItem('accessToken', response.data.data)
          setPasswordInputValue('');
          setLoginInputValue('');
          setSecondPasswordInputValue('');
          setStatusValidateForm('Вы успеешно зарегистрированы!');
          setColorOfValidateForm('yellow');
          setTimeout(()=>{
            setColorOfValidateForm('');
            setStatusValidateForm('');
          },4000)
          dispatch({ type: 'COMPLETED_AUTHORIZATION'})
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
                                        statusValidate()
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
                  <button onClick={showPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>
                <div className='PasswordField'>
                  <input id='SecondPasswordInput' 
                         className='Input' 
                         onChange={(e)=>setSecondPasswordInputValue(e.target.value)} 
                         type={`${TypeForSecondPasswordInput}`} 
                         placeholder='Please, repeat password' 
                         value={SecondPasswordInputValue}/>
                  <button onClick={showSecondPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>

                <p className='helpMessage'>Есть аккаунт? 
                  <span onClick={()=>setRegistr(false)}>ВОЙТИ</span>
                </p>
            </div>
            <button className='SignUpBTN' 
                    onClick={Registration}>Создать аккаунт</button>
        </div>
        <div className='ChangeField'>
            <p>Есть аккаунт? Тогда добро пожаловать!</p>
            <button className='SignInChangeBtn' 
                    onClick={()=>setRegistr(false)}>Войти</button>
        </div>
    </div>
  )
}
