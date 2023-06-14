import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import ActivateModal from '../Modals/ActivateModal';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices'
import { IInitialState } from '../ReduxToolkit/Interfaces';
import './Styles/AccountActivation.css'

//Success request
interface QuestionResponseI{
  data: DataI,
  status: number,
  statusText: string,
}
interface DataI{
  data: string
}

//Errors
interface ErrorI{
  response: ResponseI;
}
interface ResponseI{
  status: number
}

const AccountActivation: React.FC = ()=> {
  
    const [link, setLink]  = useSearchParams();
    
    const isLoading = useSelector((state:IInitialState)=>state.isLoading);
    const dispatch = useDispatch()
    
    const [errorMessage, setErrorMessage] = useState<string>('');

    //activate account
    const activationFunction = ():void => {
      dispatch(loadingUncomplate());
      axios.defaults.withCredentials = true;
      axios.post<QuestionResponseI>(`https://api.native-flora.tk/Auth/Activate/${link.get('id')}`)
      .then(res=>{
          setErrorMessage('Вы активировали аккаунт!');
          localStorage.setItem('accessToken', res.data.data);
        })
      .catch((err:ErrorI)=>{
        (err.response.status === 400)
          ? setErrorMessage('Такой аккаунт уже активирован!')
            : (err.response.status === 404)
              ? setErrorMessage('Такого пользователя не существует!')
                : setErrorMessage('Что-то пошло не так! Проверьте подключение к интернету')
              })
      dispatch(loadingComplate())
    }

    useEffect(()=>{
      activationFunction();
    }, [])

  return (
    <div className='mainCont'>
      <div className='upsider'>
        <img width={120} height={100} src={require('../Photos/Logo.png')}/>
      </div>
      <div className='containerForActivation'>
          <h1>Подождите...</h1>
          <h2>Идет активация вашего аккаунта</h2>
            {
              isLoading
                ? <Loading
                    type='spokes'
                    color="#5da6f3"
                    height="45px"
                    width="45px" 
                  />
                  : <ActivateModal 
                      errorMessage={errorMessage}
                      setErrorMessage={setErrorMessage}
                      activationFunction={activationFunction}
                    />
            }
      </div>
    </div>
  )
}
export default AccountActivation;