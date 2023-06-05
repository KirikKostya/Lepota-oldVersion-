import {useState} from 'react'
import SignUp from './SignUp';
import LogIn from './LogIn';
import './Styles/Registration.css'

export default function Regist() {

    const [regist, setRegistr] = useState<boolean>(false);
    
  return (
    <div className='containerForRegistration'>
      <div className='fieldEffect'></div>
        {
          (regist)
              ? <SignUp setRegistr={setRegistr} />
                : <LogIn setRegistr={setRegistr} />
        }
    </div>
  )
}
