import React, { useState } from 'react'
import TelegramIcon from '../Icons/TelegramIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import './Styles/ContactWithUs.css'

const ContactWithUs: React.FC = () => {

  const [isTelephoneOpen, setIsTelephoneOpen] = useState<boolean>(false);

  return (
    <div className='containerForContactWithUs' id='contactWithUs' >
        <h1>Контакты</h1>
        <p>С нами можно связаться через:</p>
            <div className='massagerIcons'>
                <a href='http://t.me/Kaetanaa'>
                  <TelegramIcon
                    onClick={()=>{
                      (isTelephoneOpen)
                        ? setIsTelephoneOpen(false)  
                          : setIsTelephoneOpen(true)}
                  }/>
                </a>
                <a href='https://www.instagram.com/lepota.by/' target='_blank'>
                  <InstagramIcon />
                </a>
            </div>
        {
          (!isTelephoneOpen)
            ? <p>Tub on telegram icon!</p>
             : <p className='mobilePhone'>+375 (25) 971 64 66</p>
        }
    </div>
  
  )
}

export default ContactWithUs;