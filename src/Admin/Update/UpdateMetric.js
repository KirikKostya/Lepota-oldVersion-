import React, {useState} from 'react'
import { updateMetric } from '../AdmineController';
import { refreshFunction } from '../../MailFiles/App'
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal'
import './Style/UpdateCSS.css'

export default function UpdateMetric({isOpen, metricKey, defaultMetricValue, setIsOpen}) {
    
    const [metricValue, setMetricValue] = useState(defaultMetricValue);
    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateMetric(localStorage.getItem('searchOrderById'), metricValue, metricKey, dispatch);
        setIsOpen(false)
    }

    const convertMetricNameToRuss = (metricName) => {
        return(
            metricName === 'Material'
                ? 'Материалы'
                    : metricName === 'Width'
                        ? 'Ширина'
                            : metricName === 'Length'
                                ? 'Длина'
                                    : metricName === 'Height'
                                        ? 'Высота'
                                            : metricName === 'Depth'
                                                ? 'Глубина'
                                                    : metricName === 'Diameter'
                                                        ? 'Диаметр'
                                                            : metricName === 'Weight'
                                                              &&
                                                              'Вес'
        )
    }

  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>Изменить параметр ({convertMetricNameToRuss(metricKey)})</h2>
        <input 
            className='updateInput'
            onChange={event=>setMetricValue(event.target.value)} 
            defaultValue={defaultMetricValue}
        />
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN'
                onClick={()=>refreshFunction(dispatch, handlerChange) }
            >
                Изменить
            </button>
            <p
             onClick={()=>setIsOpen(false)}
             style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
