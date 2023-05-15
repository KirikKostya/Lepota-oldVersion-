import React, { useEffect, useState } from 'react'
import { getPersonalDate } from '../MyAccountComponents/Profile';
import { refreshFunction } from '../MailFiles/App'
import { useDispatch } from 'react-redux';
import axios from 'axios';


export default function Check({ ItemsInBasket, requestBasketFunc}) {

    const [isDisabled, setIsDisabled] = useState(Boolean(localStorage.getItem('accessToken')));
    const [personalData, setPersonalData] = useState({});

    const [isShipping, setIsShipping] = useState(true);
    const [fio, setFio] = useState('');
    const [city, setCity] = useState('');
    const [adress, setAdress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipCode, setZipCode] = useState(''); 
    const [instContact, setInstContact] = useState('Not Inst');

    const dispatch = useDispatch();

    const handlerChange = (data, setFunction) => {
        setFunction(data);
    }

    //converts the time to the correct format
    const makeTime = (date) => {
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
        return `${hours}:${minutes}:${seconds}`
    } 

    //clears all forms from checkComp
    const clearForms = (setFIO, setCITY, setADRESS, setPHONE, setZIP) => {
        setFIO('');
        setCITY('');
        setADRESS('');
        setPHONE('');
        setZIP('')
    }

    //fills all input 
    const fillInputs = ()=>{
        setFio(`${personalData.surName} ${personalData.firstName} ${personalData.fatherName}`);
        setAdress(personalData.address);
        setZipCode(personalData.zipCode);
        setPhoneNumber(personalData.phone);
    }

    //creats order and clears forms and basket
    const createOrder = () => {
        axios.post('https://api.native-flora.tk/Order/Create', {
            "shipping": String(isShipping),
            "address": adress || personalData.address,
            "fio": fio || `${personalData.surName} ${personalData.firstName} ${personalData.fatherName} `,
            "phoneNumber": phoneNumber || personalData.phone,
            // "contact": instContact,
            "zipCode": zipCode || personalData.zipCode,
            // "city": city,    
            "fullDate": {
                "Time": makeTime(new Date()),
                "Date":  new Date().toISOString().split('T')[0].split('-').reverse().join('.')
            }
        }, {
            headers:{
                'x-access-token': localStorage.getItem('accessToken')
            }
        })
        .then(res=>{
            if(res.status === 200){
                requestBasketFunc();
                clearForms(setFio, setCity, setAdress, setPhoneNumber, setZipCode);
                refreshFunction(dispatch)
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getPersonalDate(dispatch, setPersonalData)
    }, [])

  return (
    <div className='check'>
        <div className='typeOfDelivery'>
            <p 
                onClick={()=>setIsShipping(!isShipping)}
                className={`${!isShipping || 'active'}`}
            >Доставка</p>
            <p 
                onClick={()=>setIsShipping(!isShipping)}
                className={`${isShipping || 'active'}`}
            >Самовывоз</p>
        </div>
        {
            isShipping
                ? <div className='infoAboutUser'>
                    <label>
                        <p>ФИО</p>
                        <input 
                            type='text'
                            className='checkInput'
                            onChange={(e)=>handlerChange(e.target.value, setFio)}
                            defaultValue={fio}
                        />
                    </label>
                    {/* <label>
                        <p>Город</p>
                        <input 
                            className='checkInput'
                            onChange={(e)=>handlerChange(e.target.value, setCity)}
                            value={city}
                        />
                    </label> */}

                    <div className='adressPostIndex'>
                        <label>
                            <p>Адрес</p>
                            <input 
                                className='checkInput adress'
                                onChange={(e)=>handlerChange(e.target.value, setAdress)}
                                defaultValue={adress}
                            />
                        </label>
                        <label>
                            <p>Индекс</p>
                            <input 
                                className='checkInput index'
                                onChange={(e)=>handlerChange(e.target.value, setZipCode)}
                                defaultValue={zipCode}
                            />
                        </label>
                    </div>
                    
                    <label>
                        <p>Номер телефона</p>
                        <input 
                            className='checkInput'
                            onChange={(e)=>handlerChange(e.target.value, setPhoneNumber)}
                            defaultValue={phoneNumber}
                        />
                    </label>
                  </div>
                  :<div className='infoAboutUser'>
                        <label>
                            <p>ФИО</p>
                            <input 
                                className='checkInput'
                                onChange={(e)=>handlerChange(e.target.value, setFio)}
                                defaultValue={fio}
                            />
                        </label>
                        <label>
                            <p>Номер телефона</p>
                            <input 
                                className='checkInput'
                                onChange={(e)=>handlerChange(e.target.value, setPhoneNumber)}
                                defaultValue={phoneNumber}
                            />
                        </label>
                        
                   </div>
        }
        <div className='btnField'>
            <button 
                className={
                    (!isDisabled || ItemsInBasket.length === 0) 
                                ? 'disabled' 
                                    : "makeBTN"}
                disabled={!isDisabled || ItemsInBasket.length === 0}
                onClick={createOrder}
            >
                Оформить заказ
            </button>
            <span 
                className='autofill'
                onClick={fillInputs}
            >Автозаполнение</span>
        </div>
    </div>
  )
}
