import React from 'react'
import './Styles/ChangeField.css'

interface IChangeFieldProps{
    paragraph: string
    btnText: string
    onClick: ()=> void
}
const ChangeField: React.FC<IChangeFieldProps> = (props) => {

    const {paragraph, btnText, onClick} = props;

    return (
        <div className='changeField'>
            <p>{paragraph}</p>
            <button 
            className='signUpChangeBtn' 
            onClick={onClick}>{btnText}</button>
        </div>
    )
}

export default ChangeField;