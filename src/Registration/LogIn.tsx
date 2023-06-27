import React, { useState } from 'react';
import { complatedAuth, loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices';
import { CloseEyeIcons, OpenEyeIcons } from '../Icons/EyesIcons';
import { checkIsAdmine } from '../Admin/AdmineController';
import { SubmitHandler, useForm } from 'react-hook-form';
import { refreshFunction } from '../MainFiles/App';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Styles/SignIn.css';


interface ILogInProps{
    setRegistr: React.Dispatch<React.SetStateAction<boolean>>
}
interface ILoginData{
    login: string
    password: string
}

const LogIn: React.FC<ILogInProps> = (props:ILogInProps) => {

    const { register, handleSubmit, reset, formState: {errors} } = useForm<ILoginData>({mode:'onChange'})

    const [closeEyesStatus, setCloseEyesStatus] = useState<boolean>(true);
    const [buttonStatus, setButtonStatus] = useState<string>('Войти');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const dispatch = useDispatch();

    const onSubmit:SubmitHandler<ILoginData> = data =>{
        dispatch(loadingUncomplate());
        axios.defaults.withCredentials = true;
        axios.post('https://api.native-flora.tk/Auth/Login', {
            'username': data.login,
            'password': data.password
        })
        .then(res => { 
            localStorage.setItem('accessToken', res.data.data);
            setButtonStatus('Перейти на главную');
            dispatch(loadingComplate());
            dispatch(complatedAuth());
            reset()
        })
        .catch(err=>{
            err.response.status === 400 && setErrorMessage('Вы ввели неправильный пароль !')
            setTimeout(()=>setErrorMessage(''), 3000);
            dispatch(loadingComplate());
        })
    }

    const { setRegistr } = props;

    return (
        <div className='containerForSignIn'>
            <div className='signIn'>
            <h1>Войти</h1>
              <form className='forInputs' onSubmit={handleSubmit(onSubmit)}>
                <input 
                    className='input' 
                    placeholder='Login' 
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
                <div className='passwordField_SI'>
                    <input 
                        className='input' 
                        placeholder='Password' 
                        type={`${closeEyesStatus ? 'password' : 'text'}`} 
                        autoComplete='off'
                        {...register('password', 
                            {
                                required: 'Обязательное поле!'
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
                {errorMessage && <span className='statusValidateForm'>{errorMessage}</span>}
                {
                    buttonStatus === 'Войти'
                        ? <button 
                            className='signInBTN'
                          >{buttonStatus}</button>
                            : <NavLink 
                                className='NavLink signInBTN'
                                to='/'
                                onClick={()=>refreshFunction(dispatch, ()=>checkIsAdmine(dispatch))}>{buttonStatus}</NavLink>
                }
              </form>
            <p 
              className='helpMessage_SI'
              onClick={()=>setRegistr(true)}>
                РЕГИСТИРОВАТЬСЯ
            </p>
        </div>
            <div className='changeField'>
                <p>У вас нет аккаунта? Зарегистрируйся!</p>
                <button 
                    className='signInChangeBtn' 
                    onClick={()=>setRegistr(true)}>Регистрация</button>
            </div>
        </div>
    )
}

export default LogIn;