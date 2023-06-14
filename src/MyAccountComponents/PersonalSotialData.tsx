import React, {useState} from 'react'
import { IProfile } from '../Admin/Update/Interfaces/Interface';

interface ISotialDataProps{
    allDataAboutUser: IProfile,
    setSotialDate: (userVK: string, userInst: string, userTelegram: string)=>void
}

const PersonalSotialData: React.FC<ISotialDataProps> = (props) => {

    const { allDataAboutUser, setSotialDate } = props;

    const [userInst, setUserInst] = useState<string>('');
    const [userVK, setUserVK] = useState<string>('');
    const [userTelegram, setUserTelegram] = useState<string>(''); 
    
  return (
    <>
        <div className='inputField'>
            <form>
            <p>Insta:</p>
            <input defaultValue={allDataAboutUser.instagram} placeholder='Ссылка' autoComplete='off' onChange={(event)=>setUserInst(event.target.value)}/>
            </form>
            <form>
            <p>VKontacte:</p>
            <input defaultValue={allDataAboutUser.vk} placeholder='Ссылка ' autoComplete='off' onChange={(event)=>setUserVK(event.target.value)}/>
            </form>
            <form>
            <p>Telegram:</p>
            <input defaultValue={allDataAboutUser.telegram} placeholder='Ссылка' autoComplete='off' onChange={(event)=>setUserTelegram(event.target.value)}/>
            </form>
        </div>
        <div className='saveButton_Prof'>
            <button 
            onClick={()=>
                setSotialDate(
                    userVK || allDataAboutUser.vk,
                    userInst || allDataAboutUser.instagram,
                    userTelegram || allDataAboutUser.telegram
                )}>
            Сохранить
            </button>
        </div>
    </>
  )
}

export default PersonalSotialData;