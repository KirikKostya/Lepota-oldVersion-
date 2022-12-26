import React, {useState, useEffect} from 'react'
import '../Styles/Registration.css'
import BackButton from './BackButton';
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Registration({ setIsAuthorizate }) {

    const [Registr, setRegistr] = useState(true);

  return (
    <div className='ContainerForRegistration'>
        <BackButton />
        <div className='FieldEffect'></div>
        {/* <div className='RegistrField'> */}
            {
            (Registr)
                ? <SignUp setRegistr={setRegistr} setIsAuthorizate = {setIsAuthorizate}/>
                  :<SignIn setRegistr={setRegistr} setIsAuthorizate = {setIsAuthorizate}/>
            }
        {/* </div> */}
        
        
    </div>
  )
}
