import React, {useState, useEffect} from 'react'
import './Styles/Registration.css'
import BackButton from './BackButton';
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Registration() {

    const [Registr, setRegistr] = useState(true);

  return (
    <div className='ContainerForRegistration'>
        <BackButton Link='/'/>
        <div className='FieldEffect'></div>
            {
            (Registr)
                ? <SignUp setRegistr={setRegistr} />
                  :<SignIn setRegistr={setRegistr} />
            }
        
        
    </div>
  )
}
