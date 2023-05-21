import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import ErrorModal from '../Modals/ErrorModal';
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

export default function AccountActivation() {
    const [link, setLink]  = useSearchParams();
    
    const isLoading = useSelector<any>(state=>state.isLoading);
    const dispatch = useDispatch()
    
    const [errorMessage, setErrorMessage] = useState<String>('');

    //activate account
    const activationFunction = ():void => {
      dispatch({type: 'LOADING_IS_UNCOMPLETED'})
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
      dispatch({type: 'LOADING_IS_COMPLETED'})
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
                  : <ErrorModal 
                      errorMessage={errorMessage}
                      setErrorMessage={setErrorMessage}
                      activationFunction={activationFunction}
                    />
            }
      </div>
    </div>
  )
}
