import React, {useEffect, useState} from 'react'
import ReactModal from 'react-modal'
import Picker from './Picker';
import Slider from '../Slider/Slider';
import { useSelector } from 'react-redux';
import '../Modals/Styles/WarningModalView.css'

export default function UpdateModalView({type, setUpdateModalViewType, allDataOfOrder, refreshFunction, updateFunc}) {

    const [changeMetricValue, setChangeMetricValue] = useState(type === 'description' ? allDataOfOrder[type].join(' ') : allDataOfOrder[type]);
    
    
    const variantId = useSelector(state=>state.variantId);
    let selectVariant = JSON.parse(localStorage.getItem('variants')).filter(el=>el.id == variantId);

    //for updates variants
    const [variantPhotos, setVariantPhotos] = useState([]);
    const [variantName, setVariantName] = useState('');
    const [variantPrice, setVariantPrice] = useState('');

    const handlerChange = async() =>{
        await updateFunc(allDataOfOrder['id'], changeMetricValue, type);
        await refreshFunction();
        setUpdateModalViewType('');
    }

    const changeVariant = async() => {
        await updateFunc(allDataOfOrder['id'], variantId, variantName||selectVariant[0].name, variantPrice||selectVariant[0].price, variantPhotos.length==0&&selectVariant[0].icon);
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
        <h3>Изменение параметра: {type}</h3>
        {
            selectVariant[0].icon.length !== 0 && type === 'variant'
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
                ? <input onChange={event => setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type]}/>
                    : type === 'description' 
                        ? <textarea style={{width: '350px', height: '175px', resize: 'none', marginBottom: '5px'}} onChange={event=>setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type].join(' ')}/> 
                            : type.includes('metric')
                                ? <input onChange={event=>setChangeMetricValue(event.target.value)} defaultValue={allDataOfOrder[type]}/>
                                    : type === 'variant'
                                        ? <div style={{width: '70%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '15px 0' }}>
                                            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} defaultValue={selectVariant[0].name}/>
                                            <input placeholder='Цена' style={{width: '50px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)} defaultValue={selectVariant[0].price}/>
                                            <Picker photos={variantPhotos} setPhotos={setVariantPhotos} style={styleForPicker} />
                                          </div>
                                            : <></>
        }
        <button 
            className='modal-closeBTN' 
            onClick={type === 'variant' ? changeVariant : handlerChange }
        >
            Изменить
        </button>
        <p onClick={()=>setUpdateModalViewType('')} style={{margin:'5px 0 0 0 ', cursor:'pointer'}}>закрыть</p>
    </ReactModal>
  )
}
