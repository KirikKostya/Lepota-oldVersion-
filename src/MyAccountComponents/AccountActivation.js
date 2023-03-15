import axios from 'axios'
import React, {useState} from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import ErrorModal from './ErrorModal';
import './Styles/AccountActivation.css'

export default function AccountActivation() {
    const [activate, setActivate] = useState(false)
    const [link, setLink]  = useSearchParams();

    const [errorMessage, setErrorMessage] = useState('');

    const activationFunction = () => {
      axios.defaults.withCredentials = true;
      axios.post(`https://api.native-flora.tk/Auth/Activate/${link.get('id')}`)
      .then(res=>{
          setErrorMessage('Вы активировали аккаунт!')
          localStorage.setItem('accessToken', res.data.data);
        })
      .catch(err=>{
        (err.response.status === 400)
          ? setErrorMessage('Такой пользователь уже существует!')
            : (err.response.status === 404)
              ? setErrorMessage('Такого пользователя не существует!')
                : setErrorMessage('Что-то пошло не так! Проверьте подключение к интернету')
      })
    }

  return (
    <div className='containerForActivation'>
        <h1>Подвердите действие на странице</h1>
        <ErrorModal errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                     />
        <div>
            <input type="checkbox" id="cbx" style={{display: 'none'}} />
            <label htmlFor="cbx" 
                   className="check" 
                   onClick={()=>{
                    setActivate(!activate);
                    if(!activate){
                      activationFunction();
                    }
                   }}>
                <svg viewBox="0 0 18 18" className='svg'>
                    <path className='path' d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
                    <polyline className='polyline' points="1 9 7 14 15 4" />
                </svg>
            </label>
        </div>
    </div>
  )
}
