import React, { useEffect, useState } from 'react'
import { getPersonalDate } from '../MyAccountComponents/Profile';
import { refreshFunction } from '../MainFiles/App'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ICartItem, IProfile } from '../Admin/Update/Interfaces/Interface';
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICheckProps{
    ItemsInBasket:ICartItem[], 
    requestBasketFunc: () => Promise<void>
}

interface IDataForOrder{
    fio: string
    city: string
    adress: string
    phoneNumber: string
    zipCode: string
    instContact: string
}

const Check: React.FC<ICheckProps> = (props) => {
    
    const { ItemsInBasket, requestBasketFunc } = props;

    const { register, handleSubmit, reset, formState: {errors} } = useForm<IDataForOrder>();

    const [isDisabled, setIsDisabled] = useState<boolean>(Boolean(localStorage.getItem('accessToken')));

    const [personalData, setPersonalData] = useState<IProfile>({
        firstName: '',
        surName: '',
        fatherName: '',
        address: '',
        zipCode: '',
        birthday: '',
        phone: '',
        vk: '',
        instagram: '',
        telegram: ''
    });

    const [isShipping, setIsShipping] = useState<boolean>(true);

    const dispatch = useDispatch();

    //converts the time to the correct format
    const makeTime = (date: Date) => {
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
        return `${hours}:${minutes}:${seconds}`
    } 

    const onSubmit: SubmitHandler<IDataForOrder> = (data) => {
        axios.post('https://api.native-flora.tk/Order/Create', {
            "shipping": String(isShipping),
            "address": data.adress,
            "fio": data.fio,
            "phoneNumber": data.phoneNumber,
            "zipCode": data.zipCode,
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
                refreshFunction(dispatch, ()=>{});
                reset();
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
        <form className='infoAboutUser' onSubmit={handleSubmit(onSubmit)}>
            {
                isShipping 
                    ?   <>
                            <label>
                                <p>ФИО</p>
                                <input 
                                    type='text'
                                    className='checkInput'
                                    {
                                        ...register('fio', {
                                            required: 'Обязательное поле!',
                                            pattern:{value: /^(?!\s).+$/, message: 'Начальный пробел не может быть первым !'},
                                        })
                                    }
                                />
                                {errors?.fio && <span className='requiredField'>{errors.fio.message}</span>}
                            </label>
                            <div className='adressPostIndex'>
                                <label>
                                    <p>Адрес</p>
                                    <input 
                                        className='checkInput adress'
                                        {
                                            ...register('adress', 
                                            {
                                                required: 'Обязательное поле !',
                                                pattern: { value: /^(?!\s).+$/, message: 'Начальный пробел не может быть первым !' },
                                            })
                                        }
                                    />
                                </label>
                                <label>
                                    <p>Индекс</p>
                                    <input 
                                        className='checkInput index'
                                        {
                                            ...register('zipCode', 
                                            {
                                                required: 'Обязательное поле !',
                                                pattern: { value: /^(?!\s).+$/, message: 'Начальный пробел не может быть первым !' },
                                            })
                                        }
                                    />
                                </label>
                            </div>
                            {
                                errors?.adress && <span className='requiredField'>{errors.adress.message}</span> 
                                || 
                                errors?.zipCode && <span className='requiredField'>{errors.zipCode.message}</span>
                            }
                            <label>
                                <p>Номер телефона</p>
                                <input 
                                    className='checkInput'
                                    {
                                        ...register('phoneNumber', 
                                        {
                                            required: 'Обязательное поле !',
                                            pattern: { value: /^(?!\s).+$/, message: 'Начальный пробел не может быть первым !' },
                                        })
                                    }
                                />
                                {errors?.phoneNumber && <span className='requiredField'>{errors.phoneNumber.message}</span>}
                            </label>
                        </>
                        : <>
                            <label>
                                <p>ФИО</p>
                                <input 
                                    className='checkInput'
                                    {
                                        ...register('fio', {
                                            required: 'Обязательное поле !',
                                            pattern: { value: /^(?!\s).+$/, message: 'Начальный пробел не может быть первым !' },
                                        })
                                    }
                                />
                                {errors?.fio && <span className='requiredField'>{errors.fio.message}</span>}
                            </label>
                            <label>
                                <p>Номер телефона</p>
                                <input 
                                    className='checkInput'
                                    {
                                        ...register('phoneNumber', {
                                            required: 'Обязательное поле!'
                                        })
                                    }
                                />
                                {errors?.phoneNumber && <span className='requiredField'>{errors.phoneNumber.message}</span>}
                            </label>
                          </>
            }   
            <div className='btnField'>
                <button
                    className={
                        (!isDisabled || ItemsInBasket.length === 0) 
                                    ? 'disabled' 
                                        : "makeBTN"}
                    disabled={!isDisabled || ItemsInBasket.length === 0}
                >
                    Оформить заказ
                </button>
            </div>
        </form>
    </div>
  )
}

export default Check;