import React, { useEffect, useState } from 'react'
import ContactWithUs from '../Components/ContactWithUs';
import PersonalDataInputs from './PersonalDataInputs';
import PersonalSotialData from './PersonalSotialData';
import UpNavigation from '../Components/UpNavigation';
import AddedNewCart from '../Admin/AddedNewCart';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { signOut } from './MyAccount';
import axios from 'axios';
import './Styles/Profile.css';
import { Dispatch } from 'redux';
import { IProfile } from '../Admin/Update/Interfaces/Interface';
import { IInitialState } from '../ReduxToolkit/Interfaces';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';

export const getPersonalDate = (dispatch: Dispatch, setList:(data: IProfile)=>void) => {
  dispatch(loadingUncomplate());
  axios.get('https://api.native-flora.tk/User/GetInfo', {
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .then(res=>res.data.data !== null && setList(res.data.data))
  .catch(err=>console.log(err))
  dispatch(loadingComplate());
}

const Profile: React.FC = () => {
  
  const [allDataAboutUser, setAllDataAboutUser] = useState<IProfile>(
    {
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
    }
  );

  //date about user
  const [userName, setUserName] = useState<string>('');
  const [userSurname, setUserSurname] = useState<string>('');
  const [userFathername, setUserFathername] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userZipcode, setUserZipcode] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userBirthday, setUserBirthday] = useState<string>('');
  const [recommendation, setUserRecommendation] = useState<string>('');

  const isAdmine = useSelector((state:IInitialState)=>state.isAdmine);
  const dispatch = useDispatch();
  
  const [typeOfData, setTypeOfData] = useState('main');
  
  const refreshAndSetType = (value:string) => {
    setTypeOfData(value);
    refreshFunction(dispatch,()=>{})
  }

  const setOptionList = (type:string):string => {
    return type === 'secureData'
            ? 'Личные данные'
              : type === 'addedCart'
                ? 'Личные данные'
                  : type === 'reference'
                    ? 'Рекомендации'
                      : type === 'messages'
                        ? 'Связаться со мной'
                          : type === 'main'
                            ? 'Личный кабинет'
                              : 'Личный кабинет'
  }

  const setPersonalData = (props:IProfile) => {
    
    const { firstName, surName, fatherName, address, zipCode, phone, birthday } = props;

    dispatch(loadingUncomplate());
    axios.post(`https://api.native-flora.tk/User/SetInfo`, {
      "firstName": firstName,
      "surName": surName,
      "fatherName": fatherName,
      "address": address,
      "zipCode": zipCode,
      "birthday": birthday,
      "phone": phone
    }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>getPersonalDate(dispatch, setAllDataAboutUser))
    .catch(err=>console.log(err))
  }

  const setSotialDate = (vk: string, instagram:string, telegram:string) => {
    dispatch(loadingUncomplate());
    axios.post(`https://api.native-flora.tk/User/SetInfo`, {
      "vk": vk,
      "instagram": instagram,
      "telegram": telegram
    }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(()=>getPersonalDate(dispatch, setAllDataAboutUser))
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    refreshFunction(dispatch, ()=>getPersonalDate(dispatch, setAllDataAboutUser));
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
      <UpNavigation hide='hide'/>
      <div className='containerForProfile' id='hideNavBarMainLink'>
        <div className='containerForDataAboutUser'>
          <span className='headerAboutUser' onClick={()=>setTypeOfData('main')}>
            {
              typeOfData !== 'main'
                &&
              <FaChevronLeft onClick={()=>setTypeOfData('main')} style={{marginRight: '15px'}}/>
            }
            { setOptionList(typeOfData) }
            { isAdmine && ` (Администатор)` }
          </span>
          <br/>
          <div className='typesOfData'>
            <span className={`typeOfData ${typeOfData==='main' && 'active' || ''}`} onClick={()=>refreshAndSetType('main')}>
              <svg width="16" height="16" fill='currentColor' viewBox="0 0 16 16" style={{marginRight: '3px'}}> 
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/> 
              </svg>
              Главная
            </span>
            {
              isAdmine
                ? <span className={`typeOfData ${typeOfData==='addedCart' && 'active' || ''}`} onClick={()=>refreshAndSetType('addedCart')}>
                    <svg width="16" height="16" fill='currentColor' viewBox="0 0 22 22" style={{marginRight: '3px'}}> 
                      <g> 
                        <path fill="none" d="M0 0h24v24H0z"/> 
                        <path d="M20 22H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-2H6a1 1 0 0 0 0 2h13zM5 16.17c.313-.11.65-.17 1-.17h13V4H6a1 1 0 0 0-1 1v11.17zM12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-3 4a3 3 0 0 1 6 0H9z"/> 
                      </g> 
                    </svg>
                    Добавить товар
                  </span>
                  : <span className={`typeOfData ${typeOfData==='secureData' && 'active' || ''}`} onClick={()=>refreshAndSetType('secureData')}>
                      <svg width="16" height="16" fill='currentColor' viewBox="0 0 24 24" style={{marginRight: '3px'}}> 
                        <path d="M14.26862,15.01038A4.28181,4.28181,0,0,1,15.04993,13.01H11.02167v-2h7.994v.001a4.90339,4.90339,0,0,1,1.99871.43939V3.01337A2.00146,2.00146,0,0,0,19.01294,1.0119H3.01587A2.00151,2.00151,0,0,0,1.0144,3.01337V17.01044A2.00147,2.00147,0,0,0,3.01587,19.0119H13.0127v-.801a3.01328,3.01328,0,0,1,.26831-1.20056H7.01337v-2Zm4.74414-6.0008H11.01868v-2h7.99408ZM7.01337,3.01062H19.01276v2H7.01337ZM5.002,17.01038h-2v-2h2Zm0-11.99976h-2v-2h2Zm2.00538,1.999h2v2h-2Zm.003,6.00043v-2h2v2Zm14.80236,4.001v-1.5a2.818,2.818,0,0,0-5.6,0v1.5a1.29042,1.29042,0,0,0-1.2,1.2v3.5a1.30931,1.30931,0,0,0,1.2,1.3h5.5a1.30939,1.30939,0,0,0,1.3-1.2v-3.5A1.30937,1.30937,0,0,0,21.81274,17.01105Zm-1.3,0h-3v-1.5a1.37461,1.37461,0,0,1,1.5-1.3,1.37465,1.37465,0,0,1,1.5,1.3Z"/> 
                      </svg>
                      Личные данные
                    </span>
            }
            <span className={`typeOfData ${typeOfData==='reference' && 'active' || ''}`} onClick={()=>refreshAndSetType('reference')}>
              <svg width="16" height="16" fill='currentColor' viewBox="0 0 24 24" style={{marginRight: '3px'}}> 
                <g> 
                  <path fill="none" d="M0 0h24v24H0z"/> 
                  <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
                </g> 
              </svg>
              Рекомендации
            </span>
            <span className={`typeOfData ${typeOfData==='messages' && 'active' || ''}`} onClick={()=>refreshAndSetType('messages')}>
              <svg width="16" height="16" fill='currentColor' viewBox="0 0 22 22" style={{marginRight: '3px'}}> 
                <g> 
                  <path fill="none" d="M0 0h24v24H0z"/> 
                  <path d="M20 22H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-2H6a1 1 0 0 0 0 2h13zM5 16.17c.313-.11.65-.17 1-.17h13V4H6a1 1 0 0 0-1 1v11.17zM12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-3 4a3 3 0 0 1 6 0H9z"/> 
                </g> 
              </svg>
              Контакт
            </span>
          </div>
          {
            typeOfData==='main'
              ? <div className='listInfoCard-Profile'>
                {
                  isAdmine 
                  ? <div className='infoCard profileUser' onClick={()=>refreshAndSetType('addedCart')}>
                      <div className='dataContainer'>
                        <svg 
                            width="50" 
                            height="50" 
                            viewBox="0 0 16 16" 
                            fill="#5da6fA"
                        > 
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                          <path fillRule="evenodd" 
                                d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
                        </svg>
                        <div className='dataProf'>
                          <span className='header'>Admin</span>
                        </div>
                      </div>
                    </div>
                    : <div className='infoCard profileUser' onClick={()=>refreshAndSetType('secureData')}>
                        <div className='dataContainer'>
                          <svg 
                              width="50" 
                              height="50" 
                              viewBox="0 0 16 16" 
                              fill="#5da6fA"
                          > 
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> 
                            <path fillRule="evenodd" 
                                  d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> 
                          </svg>
                          <div className='dataProf'>
                            <span className='header'>Name Surname</span>
                            <span>{allDataAboutUser?.phone}</span>
                          </div>
                        </div>
                        <NavLink to={'/'} className='exiteBtn' onClick={()=>signOut(dispatch)}>Выйти</NavLink>
                      </div>
                  }
                  <NavLink to='/' className='infoCard profileCatalog' onClick={()=>refreshAndSetType('main')}>
                    <div className='dataContainer'>
                      <div className='dataProf'>
                        <span className='header'>Каталог товаров</span>
                        <span>
                          Выбирайте товары по душе и заказывайте.
                          <br/> Мы ждем вас! 
                        </span>
                      </div>
                    </div>
                  </NavLink>
                  <div className='infoCard profileContactMe' onClick={()=>refreshAndSetType('messages')}>
                    <div className='dataContainer'>
                      <div className='dataProf'>
                        <span className='header'>Связаться со мной</span>
                        <span> Выберите Соц. Сеть: <br/>Инстаграмм, Вайбер, Телеграмм 
                        </span>
                      </div>
                    </div>
                  </div>
                  <NavLink to='/OrdersArchive' className='infoCard profileArchive' onClick={()=>refreshAndSetType('main')}>
                    <div className='dataContainer'>
                      <div className='dataProf'>
                        <span className='header'>Архив заказов</span>
                        <span>Отслеживайте и просматривайте историю заказов</span>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink to='/MyBasket' className='infoCard profileBasket' onClick={()=>refreshAndSetType('main')}>
                    <div className='dataContainer'>
                      <div className='dataProf'>
                        <span className='header'>Корзина</span>
                        <span>Оформляйте заказы в корзине</span>
                      </div>
                    </div>
                  </NavLink>
                  <div className='infoCard profileRecomendation' onClick={()=>refreshAndSetType('reference')}>
                    <div className='dataContainer'>
                      <div className='dataProf'>
                        <span className='header'>Рекомендации</span>
                        <span>Здесь вы можете оставить ваши <br/> предложения по развитию сайта</span>
                      </div>
                    </div>
                  </div>
                </div>
                : typeOfData === 'secureData'
                  ? <PersonalDataInputs allDataAboutUser={allDataAboutUser} setPersonalData={setPersonalData}/>
                    : typeOfData === 'addedCart'
                      ? <AddedNewCart />
                        : typeOfData === 'reference'
                          ? <>
                              <div className='inputField'>
                                <div className='textArea'>
                                  <textarea value={recommendation} autoComplete='off' onChange={(event)=>setUserRecommendation(event.target.value)}/>
                                  <div className='saveButton_Prof'>
                                    <button>
                                      Отправить
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                            : typeOfData === 'messages'
                              && 
                              <PersonalSotialData allDataAboutUser={allDataAboutUser} setSotialDate={setSotialDate}/>
          }
        </div>
      </div>
      <ContactWithUs />
    </>
  )
}

export default Profile;