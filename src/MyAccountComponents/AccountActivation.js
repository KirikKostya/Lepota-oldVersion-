import axios from 'axios'
import React, {useState} from 'react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import './Styles/AccountActivation.css'

export default function AccountActivation() {
    const [changePage, setChangePage] = useState(false);
    const [link, setLink]  = useSearchParams();

    const activationFunction = () => {
      axios.defaults.withCredentials = true;
      axios.post(`https://api.native-flora.tk/Auth/Activate/${link.get('id')}`)
      .then(res=>{
        localStorage.setItem('accessToken', res.data.data);
      })
      .catch(err=>{
        console.log(err);
        alert('Что-то пошло не так!');
      })
    }
  return (
    <div className='containerForActivation'>
        <h1>Подвердите действие на странице</h1>
        <div>
            <input type="checkbox" id="cbx" style={{display: 'none'}} />
            <label htmlFor="cbx" 
                   className="check" 
                   onClick={()=>{
                    setChangePage(!changePage);
                    activationFunction();
                   }}>
                <svg viewBox="0 0 18 18" className='svg'>
                    <path className='path' d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
                    <polyline className='polyline' points="1 9 7 14 15 4" />
                </svg>
            </label>
        </div>
         <NavLink to='/' className={`NavLink ${changePage || 'hiddenPar'}`}><span>Перейти на главную страницу</span></NavLink>
    </div>
  )
}
