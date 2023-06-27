import React, { useState } from 'react';
import CookieIcon from '../Icons/CookieIcon'
import InfoIcon from '../Icons/InfoIcon';
import { Button, Modal } from 'antd';
import Cookies from 'js-cookie';
import './Styles/CookieAlert.css';

const CookieAlert: React.FC = () => {
  
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(JSON.parse(Cookies.get('cookieActivate') || 'true'));

  const toggleStateOfMSG = ():void => {
    Cookies.set('cookieActivate', 'true');
    isOpenAlert 
      ? setIsOpenAlert(false) 
        : setIsOpenAlert(true)
  }

  return (
    <Modal open={isOpenAlert} cancelButtonProps={{style: {display: 'none'}}} okText='Да, я согласен !' closable={false} onOk={toggleStateOfMSG}>
      <div className='paragraph'>
        <InfoIcon width='1.7em' height='1.7em'/>
        <h4>
          Уважаемый пользователь, для вашего удобства команда Lepota использует 
          COOKIE <CookieIcon/>
        </h4>
        <p>Даёте ли вы согласие на их использование? <Button type='link' href='https://tervisekassa.ee/ru/cookies/documentation' target='_blank'> подробнее...</Button></p>
      </div>
    </Modal>
  )
}

export default CookieAlert;