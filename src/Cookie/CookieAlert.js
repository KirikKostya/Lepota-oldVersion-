import React, {useState} from 'react'
import Cookie from '../Icons/Cookie'
import Cookies from 'js-cookie';
import './Styles/CookieAlert.css'

export default function CookieAlert() {
  const [closeMSG, setCloseMSG] = useState('');

  const toggleStateOfMSG = () => {
    Cookies.set('cookieActivate', true);
    return closeMSG === '' ? setCloseMSG('displayNone') : setCloseMSG('')
  }

  return (
    <div className={`cookieContainer ${closeMSG}`} >
        <div className='paragraph'>
            <p>
              Уважаемый пользователь, для вашего удобства команда Lepota использует 
              COOKIE <Cookie/>
            </p>
            <p>Даёте ли вы согласие на их использование? <a href='https://tervisekassa.ee/ru/cookies/documentation' target='_blank'> подробнее...</a></p>
        </div>
        <div className='cookieBts'>
            <button onClick={toggleStateOfMSG}>Да, согласен!</button>
        </div>
    </div>
  )
}
