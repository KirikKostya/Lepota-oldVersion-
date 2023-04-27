import React, {useState} from 'react'
import ReactModal from 'react-modal'
import '../Modals/Styles/WarningModalView.css'

export default function UpdateModalView({type, setUpdateModalViewType, allDataOfOrder, refreshFunction, updateFunc}) {

    const [changeMetricValue, setChangeMetricValue] = useState(type === 'description' ? allDataOfOrder[type].join(' ') : allDataOfOrder[type]);
     
    const handlerChange = async() =>{
        await updateFunc(allDataOfOrder['id'], changeMetricValue);
        setUpdateModalViewType('');
        await refreshFunction();
        localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify({...allDataOfOrder, [type]: type === 'description' ? changeMetricValue.split('.') : changeMetricValue}))
    }

    const handlerChangeMetric = async() =>{
        console.log(type)
        await updateFunc(allDataOfOrder['id'], changeMetricValue, type);
        setUpdateModalViewType('');
        await refreshFunction();
        localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify({...allDataOfOrder, sizes: {...allDataOfOrder.sizes, [type.replace('metric ', '')]: changeMetricValue}}))
    }

  return (
    <ReactModal 
        isOpen={type == '' ? false : true }
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h3>Изменение параметра: {type}</h3>
        {
            type === 'name'
                ? <input onChange={event => setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type]}/>
                    : type === 'description' 
                        ? <textarea style={{width: '350px', height: '175px', resize: 'none', marginBottom: '5px'}} onChange={event=>setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type].join(' ')}/> 
                            : type.includes('metric')
                                ? <input onChange={event => setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type]}/>
                                    : <></>
        }
        <button 
            className='modal-closeBTN' 
            onClick={type.includes('metric') ? handlerChangeMetric : handlerChange}
        >
            Изменить
        </button>
    </ReactModal>
  )
}
