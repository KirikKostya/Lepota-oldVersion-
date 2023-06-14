import React, {useState} from 'react'
import { updateMetric } from '../AdmineController';
import { refreshFunction } from '../../MainFiles/App'
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal'
import './Style/UpdateCSS.css'
import { IUpdateMetricProps } from './Interfaces/Interface';
import { FaChevronLeft } from 'react-icons/fa';

const UpdateMetric: React.FC<IUpdateMetricProps> = (props: IUpdateMetricProps) => {

    const {isOpen, metricKey, defaultMetricValue, setIsOpen} = props;

    const [metricValue, setMetricValue] = useState<string>(defaultMetricValue);
    const dispatch = useDispatch();

    const handlerChange = async() =>{
        updateMetric(localStorage.getItem('searchOrderById') || '{}', metricValue, metricKey, dispatch);
        setIsOpen({isOpen:false, value:''})
    }

    const convertMetricNameToRuss = (metricName: string):string => {
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
                                                              ?
                                                                'Вес'
                                                                    : ''
        )
    }

  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>
            <FaChevronLeft
                style={{width: '10px', marginRight: '10px'}} 
                onClick={()=>setIsOpen({isOpen:false, value:''})}
            />
            Изменить параметр ({convertMetricNameToRuss(metricKey)})</h2>
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
        </div>
    </ReactModal>
  )
}

export default UpdateMetric;