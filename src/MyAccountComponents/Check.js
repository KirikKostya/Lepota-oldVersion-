import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Check() {

    const dispatch = useDispatch()
    const typeOfDelivery = useSelector(state=>state.typeOfDelivery)

    const handlerChange = (TYPE) => {
        dispatch({type: TYPE})
    }

  return (
    <div className='Chek'>
        <div className='typeOfDelivery'>
            <p 
                onClick={()=>handlerChange('SET_TYPE_OF_DELIVERY_TO_PICK_UP')}
                className={`${typeOfDelivery === 'pickUp' ? 'active' : ''}`}    
            >Самовывоз</p>
            <p 
                onClick={()=>handlerChange('SET_TYPE_OF_DELIVERY_TO_DELIVERY')}
                className={`${typeOfDelivery === 'delivery' ? 'active' : ''}`}
            >Доставка</p>
        </div>
        {
            typeOfDelivery == 'delivery'
                ? <div className='infoAboutUser'>
                    <label>
                        <p>ФИО</p>
                        <input className='checkInput'/>
                    </label>
                    <label>
                        <p>Город</p>
                        <input className='checkInput'/>
                    </label>

                    <div className='adressPostIndex'>
                        <label>
                            <p>Адрес</p>
                            <input className='checkInput adress'/>
                        </label>
                        <label>
                            <p>Индекс</p>
                            <input className='checkInput index'/>
                        </label>
                    </div>
                    
                    <label>
                        <p>Номер телефона</p>
                        <input className='checkInput'/>
                    </label>
                  </div>
                  :<div className='infoAboutUser'>
                        <label>
                            <p>ФИО</p>
                            <input className='checkInput'/>
                        </label>
                        <label>
                            <p>Номер телефона</p>
                            <input className='checkInput'/>
                        </label>
                        
                   </div>
        }
        <button className='makeBTN'>Оформить заказ</button>
    </div>
  )
}
