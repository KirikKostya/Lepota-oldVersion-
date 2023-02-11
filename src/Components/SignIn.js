import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Styles/SignIn.css'

export default function SignIn({setRegistr, setIsAuthorizate}) {
  
  let PasswordInput;

  useEffect(()=>{
     PasswordInput = document.querySelector('#PasswordInput');
  }, [])
  
    const [LoginInputValue, setLoginInputValue] = useState('');
    const [PasswordInputValue, setPasswordInputValue] = useState('');
    const [TypeOfPasswordInput, setTypeOfPasswordInput] = useState('password')
    const [StatusValidateForm, setStatusValidateForm] = useState('') 
    const [ColorOfValidateForm, setColorOfValidateForm] = useState('bad')


  const showPassword = ()=>{
    if(TypeOfPasswordInput == 'password'){
      setTypeOfPasswordInput('text')
    } else {
      setTypeOfPasswordInput('password')
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return (re.test(email));
  }

  const statusValidate = async ()=>{
    if(validateEmail(LoginInputValue)){
        setStatusValidateForm('Отлично!');
        setColorOfValidateForm('good')
        return true
      } else {
        setStatusValidateForm('Вы ввели некорректный Email!');
        setColorOfValidateForm('bad')
        return false
     }
  }

  const Authorization = async ()=> {
    let status = await statusValidate();
    if(PasswordInputValue && status){  
      axios.defaults.withCredentials = true;
      let response = await axios
                              .post('https://api.native-flora.tk/Auth/Login', 
                              {
                                 'username': LoginInputValue,
                                 'password': PasswordInputValue
                              })

        localStorage.setItem('accessToken', response.data.data);
          setPasswordInputValue('');
          setLoginInputValue('');
          setStatusValidateForm('');
          setStatusValidateForm('Вы вошли в свой аккаунт!');
          setColorOfValidateForm('yellow')
          setTimeout(()=>{
            setColorOfValidateForm('');
            setStatusValidateForm('')
          },4000)
          setIsAuthorizate(true)
    } else {
      console.log('123')
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
                       onChange={(e)=>{
                                        setLoginInputValue(e.target.value);
                                        statusValidate()
                                      }} 
                       placeholder='Login' 
                       value={LoginInputValue}/>
                <span className={`StatusValidateForm ${ColorOfValidateForm}`}>{StatusValidateForm}</span>
                <div className='PasswordField'>
                  <input id='PasswordInput' 
                         className='Input' 
                         onChange={(e)=>setPasswordInputValue(e.target.value)} 
                         type={`${TypeOfPasswordInput}`} 
                         placeholder='Password' 
                         value={PasswordInputValue}/>
                  <button onClick={showPassword} className='EyeBtn'>&#128065;&#65039;</button>
                </div>

            </div>
            <p className='RegistrBtn' onClick={()=>setRegistr(true)}>Зарегистрироваться</p>
            <button className='SignInBTN' onClick={Authorization}>Войти</button>
        </div>
        <div className='ChangeField'>
          <p>У вас нет аккаунта? Зарегистрируйся!</p>
          <button className='SignInChangeBtn' onClick={()=>setRegistr(true)}>Регистрация</button>
        </div>
    </div>
  )
}
