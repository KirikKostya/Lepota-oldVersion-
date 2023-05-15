import React, {useState} from 'react'

export default function PersonalSotialData({allDateAboutUser, setSotialDate}) {

    const [userInst, setUserInst] = useState('');
    const [userVK, setUserVK] = useState('');
    const [userTelegram, setUserTelegram] = useState(''); 
    const [recommendation, setUserRecommendation] = useState('');
    
  return (
    <>
        <div className='inputField'>
            <form>
            <p>Insta:</p>
            <input defaultValue={allDateAboutUser.instagram} placeholder='Ссылка' autoComplete='off' onChange={(event)=>setUserInst(event.target.value)}/>
            </form>
            <form>
            <p>VKontacte:</p>
            <input defaultValue={allDateAboutUser.vk} placeholder='Ссылка ' autoComplete='off' onChange={(event)=>setUserVK(event.target.value)}/>
            </form>
            <form>
            <p>Telegram:</p>
            <input defaultValue={allDateAboutUser.telegram} placeholder='Ссылка' autoComplete='off' onChange={(event)=>setUserTelegram(event.target.value)}/>
            </form>
        </div>
        <div className='saveButton_Prof'>
            <button 
            onClick={()=>
                setSotialDate(
                    userVK || allDateAboutUser.vk,
                    userInst || allDateAboutUser.instagram,
                    userTelegram || allDateAboutUser.telegram
                )}>
            Сохранить
            </button>
        </div>
    </>
  )
}
