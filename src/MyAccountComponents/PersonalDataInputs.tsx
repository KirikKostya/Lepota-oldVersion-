import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { IProfile } from '../Admin/Update/Interfaces/Interface';

interface IPersonalDataProps{
    allDataAboutUser: IProfile,
    setPersonalData: (props: IProfile)=>void
}

const PersonalDataInputs: React.FC<IPersonalDataProps> = (props) => {

    const { allDataAboutUser, setPersonalData } = props;

    //date about user
    const [firstName, setfirstName] = useState<string>(allDataAboutUser.firstName);
    const [userSurname, setUserSurname] = useState<string>(allDataAboutUser.surName);
    const [userFathername, setUserFathername] = useState<string>(allDataAboutUser.fatherName);
    const [userAddress, setUserAddress] = useState<string>(allDataAboutUser.address);
    const [userZipCode, setUserZipCode] = useState<string>(allDataAboutUser.zipCode);
    const [userPhone, setUserPhone] = useState<string>(allDataAboutUser.phone);
    const [userBirthday, setUserBirthday] = useState<string>(allDataAboutUser.birthday);
    
  return (
    <>
        <div className='inputField'>
            <form>
                <p>Фамилия:</p>
                <input defaultValue={allDataAboutUser.surName} placeholder='Ваша фамилия' autoComplete='off' onChange={(event)=>setUserSurname(event.target.value)} />
            </form>
            <form>
                <p>Имя:</p>
                <input defaultValue={allDataAboutUser.firstName} placeholder='Ваше имя' autoComplete='off' onChange={(event)=>setfirstName(event.target.value)}/>
            </form>
            <form>
                <p>Отчество:</p>
                <input defaultValue={allDataAboutUser.fatherName} placeholder='Ваше отчество' autoComplete='off' onChange={(event)=>setUserFathername(event.target.value)}/>
            </form>
        </div>
        <div className='inputField'>
            <form>
            <p>Адрес:</p>
            <div className='address'>
                <input defaultValue={allDataAboutUser.address} id='address' placeholder='Ваша адрес' autoComplete='off' onChange={(event)=>setUserAddress(event.target.value)} />
                <input defaultValue={allDataAboutUser.zipCode} id='index' placeholder='Индекс' autoComplete='off' onChange={(event)=>setUserZipCode(event.target.value)}/>
            </div>
            </form>
            <form>
            <p>Телефон:</p>
            <InputMask 
                placeholder='+375 (__) ___-__-__'
                value={userPhone || allDataAboutUser.phone}
                onChange={(event:any)=>{
                    setUserPhone(event.target.value)
                }}
                mask='+375 (99) 999-99-99'
            />
            </form>
            <form>
            <p>Дата рождения:</p>
            <input defaultValue={allDataAboutUser.birthday} type='date' placeholder='дд.мм.гггг' autoComplete='off' onChange={(event)=>setUserBirthday(event.target.value)}/>
            </form>
        </div>
        <div className='saveButton_Prof'>
            <button 
            type='submit'
            onClick={()=>{
                setPersonalData({
                    firstName: firstName,
                    surName: userSurname,
                    fatherName: userFathername, 
                    address: userAddress, 
                    zipCode: userZipCode, 
                    phone: userPhone, 
                    birthday: userBirthday,
                    vk: '',
                    instagram: '',
                    telegram: ''})
                }}>
            Сохранить
            </button>
        </div>
    </>
  )
}

export default PersonalDataInputs;
