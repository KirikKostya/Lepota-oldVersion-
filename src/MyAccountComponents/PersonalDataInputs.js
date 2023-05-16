import React, {useEffect, useState, createRef} from 'react'
import InputMask from 'react-input-mask';

export default function PersonalDataInputs({allDateAboutUser, setPersonalDate}) {

    const maskRef = createRef(null)

    //date about user
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userFathername, setUserFathername] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userZipcode, setUserZipcode] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [userInst, setUserInst] = useState('');
    const [userVK, setUserVK] = useState('');
    const [userTelegram, setUserTelegram] = useState(''); 
    const [recommendation, setUserRecommendation] = useState('');

    useEffect(() => {
    //   const input = maskRef.current;
    //   console.log(maskRef)
    }, []);
    
  return (
    <>
        <div className='inputField'>
            <form>
            <p>Фамилия:</p>
            <input defaultValue={allDateAboutUser.surName} placeholder='Ваша фамилия' autoComplete='off' onChange={(event)=>setUserSurname(event.target.value)} />
            </form>
            <form>
            <p>Имя:</p>
            <input defaultValue={allDateAboutUser.firstName} placeholder='Ваше имя' autoComplete='off' onChange={(event)=>setUserName(event.target.value)}/>
            </form>
            <form>
            <p>Отчество:</p>
            <input defaultValue={allDateAboutUser.fatherName} placeholder='Ваше отчество' autoComplete='off' onChange={(event)=>setUserFathername(event.target.value)}/>
            </form>
        </div>
        <div className='inputField'>
            <form>
            <p>Адрес:</p>
            <div className='address'>
                <input defaultValue={allDateAboutUser.address} id='address' placeholder='Ваша адрес' autoComplete='off' onChange={(event)=>setUserAddress(event.target.value)} />
                <input defaultValue={allDateAboutUser.zipCode} id='index' placeholder='Индекс' autoComplete='off' onChange={(event)=>setUserZipcode(event.target.value)}/>
            </div>
            </form>
            <form>
            <p>Телефон:</p>
            <InputMask 
                placeholder='+375 (__) ___-__-__'
                value={userPhone || allDateAboutUser.phone}
                onChange={(event)=>{
                    setUserPhone(event.target.value)
                }}
                mask='+375 (99) 999-99-99'
            />
            </form>
            <form>
            <p>Дата рождения:</p>
            <input defaultValue={allDateAboutUser.birthday} type='date' placeholder='дд.мм.гггг' autoComplete='off' onChange={(event)=>setUserBirthday(event.target.value)}/>
            </form>
        </div>
        <div className='saveButton_Prof'>
            <button onClick={()=>{
                setPersonalDate(
                    userName || allDateAboutUser.firstName,
                    userSurname || allDateAboutUser.surName,
                    userFathername || allDateAboutUser.fatherName, 
                    userAddress || allDateAboutUser.address, 
                    userZipcode  || allDateAboutUser.zipCode, 
                    userPhone || allDateAboutUser.phone, 
                    userBirthday || allDateAboutUser.birthday,
                    userVK || allDateAboutUser.vk,
                    userInst || allDateAboutUser.instagram,
                    userTelegram || allDateAboutUser.telegram
                )
            }}>
            Сохранить
            </button>
        </div>
    </>
  )
}
