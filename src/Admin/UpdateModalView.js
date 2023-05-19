import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Picker from './Picker';
import Slider from '../Slider/Slider';
import { useDispatch, useSelector } from 'react-redux';
import './Style/UpdateModalView.css'

export default function UpdateModalView({type, setUpdateModalViewType, allDataOfOrder, refreshFunction, updateFunc}) {

    const [changeMetricValue, setChangeMetricValue] = useState(type === 'description' ? allDataOfOrder[type].join(' ') : allDataOfOrder[type]);
    
    const variantId = useSelector(state=>state.variantId);
    const dispatch = useDispatch();

    let selectVariant = JSON.parse(localStorage.getItem('variants')).filter(el=>el.id == variantId);

    //for updates variants
    const [variantPhotos, setVariantPhotos] = useState([]);
    const [variantName, setVariantName] = useState('');
    const [variantPrice, setVariantPrice] = useState('');

    const changeMetric = async() =>{
        await updateFunc(allDataOfOrder['id'], changeMetricValue || selectVariant[0].sizes[type.replace('metric ', '')], type, dispatch);
        await refreshFunction();
        setUpdateModalViewType('');
    }

    const changeVariant = async() => {
        await updateFunc(allDataOfOrder['id'], variantId, variantName || selectVariant[0].name, variantPrice||selectVariant[0].price, variantPhotos.length==0&&selectVariant[0].icon, dispatch);
        await refreshFunction();
        setUpdateModalViewType('');
    }

    const changeDescription = async() => {
      await updateFunc(allDataOfOrder['id'], changeMetricValue, dispatch);
      await refreshFunction();
      setUpdateModalViewType('');
    }

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

  return (
    <ReactModal 
        isOpen={type == '' ? false : true }
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h3>Изменение параметра: {type.replace('metric ', '')}</h3>
        {
          selectVariant.length === 0
            ? <></>
              : selectVariant[0].icon.length !== 0 && type === 'variant'
                && 
                <Slider>
                  {
                    selectVariant[0].icon.map(img=>(
                      <img key={img} src={ img } alt='something'/>
                    ))
                  }
                </Slider>  
        }
        {
            type === 'name'
                ? <input 
                    className='updateInput'
                    onChange={event => setChangeMetricValue(event.target.value)} 
                    defaultValue={allDataOfOrder[type]}
                  />
                    : type === 'description' 
                        ? <textarea 
                            className='updateTextarea'
                            onChange={event=>setChangeMetricValue(event.target.value)} 
                            defaultValue={allDataOfOrder[type].join(' ')}
                          /> 
                            : type.includes('metric')
                                ? <input 
                                    className='updateInput'
                                    onChange={event=>setChangeMetricValue(event.target.value)} 
                                    defaultValue={allDataOfOrder.sizes[type.replace('metric ', '')]}
                                  />
                                    : type === 'variant'
                                          && 
                                          <div className='formContainer'>
                                            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} defaultValue={selectVariant[0].name}/>
                                            <input placeholder='Цена' style={{width: '50px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)} defaultValue={selectVariant[0].price}/>
                                            <Picker photos={variantPhotos} setPhotos={setVariantPhotos} style={styleForPicker}/>
                                          </div>
        }
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN' 
                onClick={type === 'variant' ? changeVariant : type.includes('metric') ? changeMetric : changeDescription }
            >
                Изменить
            </button>
            <p onClick={()=>refreshFunction(dispatch, ()=>setUpdateModalViewType(''))} style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
