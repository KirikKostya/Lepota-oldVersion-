import React, { useState } from 'react';
import { CloseEyeIcons, OpenEyeIcons } from '../Icons/EyesIcons';
import InfoIcon from '../Icons/InfoIcon';
import { SubmitHandler, useForm } from 'react-hook-form';
import { complatedAuth} from '../ReduxToolkit/Slices';
import { useDispatch } from 'react-redux';
import ModalView from '../Modals/ModalView';
import axios from 'axios';
import './Styles/SignUp.css';

interface ISignUpProps{
    setRegistr: React.Dispatch<React.SetStateAction<boolean>>
}
interface ISignUpData{
    login: string
    password: string
    secondPassword: string
}
const SignUp: React.FC<ISignUpProps> = (props:ISignUpProps) => {
    
    const { register, handleSubmit, reset, formState: {errors} } = useForm<ISignUpData>({mode:'onChange'});

    const [closeEyesStatus, setCloseEyesStatus] = useState<boolean>(true);
    const [closeSecondEyesStatus, setCloseSecondEyesStatus] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [userExist, setUseExist] = useState<string>('');

    const dispatch = useDispatch();

    const onSubmit:SubmitHandler<ISignUpData> = data =>{
      axios.defaults.withCredentials = true;
        axios
          .post('https://api.native-flora.tk/Auth/Register', 
              {
                 'username': data.login,
                 'password': data.password
              })
          .then(() =>{
                dispatch(complatedAuth());
                setIsModalOpen(true);
                setTimeout(()=>setIsModalOpen(false), 2000);
                reset()
            })
          .catch(err=>{
            if(err.response.status === 400){
                setUseExist('Такой пользователь существует!');
                setTimeout(()=>setUseExist(''), 3000)
            }
          })
    }

    const { setRegistr } = props;

    return (
        <div className='containerForSignUp'>
            <div className='signUp'>
            <h1>Войти</h1>
              <form className='forInputs' onSubmit={handleSubmit(onSubmit)}>
                <input 
                    className='input' 
                    placeholder='Email'
                    autoComplete='off'
                    {
                        ...register('login',
                        {
                            required: 'Обязательное поле!',
                            pattern: {
                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/iu,
                                message: 'Введите правильный формат Email'
                            }
                        })
                    }
                />
                {errors?.login && <span className='statusValidateForm'>{errors.login.message}</span>}
                {userExist ? <span className='statusValidateForm'>{userExist}</span> : ''}
                <div className='passwordField'>
                    <input 
                        className='input' 
                        type={`${closeEyesStatus ? 'password' : 'text'}`} 
                        placeholder='Password'
                        autoComplete='off'
                        {...register('password', 
                            {
                                required: 'Обязательное поле!',
                            })
                        }
                    />
                        {
                            closeEyesStatus
                                ? <CloseEyeIcons onClick={()=>setCloseEyesStatus(false)}/>
                                    : <OpenEyeIcons onClick={()=>setCloseEyesStatus(true)}/>
                        }
                </div>
                {errors?.password && <span className='statusValidateForm'>{errors.password.message}</span>}
                <div className='passwordField'>
                    <input 
                        className='input' 
                        type={`${closeSecondEyesStatus ? 'password' : 'text'}`}
                        placeholder='Second password' 
                        autoComplete='off'
                        {...register('secondPassword', 
                            {
                                required: 'Обязательное поле!',
                            })
                        }
                    />
                        {
                            closeSecondEyesStatus
                                ? <CloseEyeIcons onClick={()=>setCloseSecondEyesStatus(false)}/>
                                    : <OpenEyeIcons onClick={()=>setCloseSecondEyesStatus(true)}/>
                        }
                </div>
                {errors?.secondPassword && <span className='statusValidateForm'>{errors.secondPassword.message}</span>}
                <button className={`signUpBTN`}>
                    Создать аккаунт
                </button>
              </form>
            <p 
              className='helpMessage'
              onClick={()=>setRegistr(false)}>
            РЕГИСТИРОВАТЬСЯ
            </p>
            </div>
            <div className='changeField'>
                <p>Есть аккаунт? Тогда добро пожаловать!</p>
                <button 
                className='signInChangeBtn' 
                onClick={()=>setRegistr(false)}>Войти</button>
            </div>
            <ModalView isOpen={isModalOpen} title={<h4><InfoIcon margin='0 5px 0 0'/>Мы отправили вам подтвердительное письмо на почту. Подтвердите что эта почта ваша!</h4>}/>
        </div>
    )
}

export default SignUp;