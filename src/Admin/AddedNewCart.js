import React, {useState} from 'react'
import SingleSelect from '../DropDowns/SingleSelect'
import {OptionsOfMetrics} from '../DropDowns/OptionList'
import { refreshFunction } from '../MailFiles/App';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Style/AddedNewCart.css'
import Picker from './Picker';

export default function AddedNewCart() {
    
    const [photos, setPhotos] = useState(Array);
    const [discription, setDiscription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [metricsListStep, setMetricsListStep] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const dispatch = useDispatch()

    //creates URL of local photo
    const makeListOfAddedPhotos = (event)=>{
        if (event.target.files && event.target.files[0]) {
          setPhotos([...photos, URL.createObjectURL(event.target.files[0])])
        }
    }

    //filter option on select
    const filter = (optionList, selectedList) => {
        let newArray = [...optionList];
        for(let i=0; i<selectedList.length; i++){
            newArray = [...newArray.filter(el=> el.value !== selectedList[i].metric)]
        }
        return newArray
    }

    //gets value of metric by metric name
    const getValueByMetricName = (selectedOptions, type) => {
        for(let i=0; i<selectedOptions.length; i++){
            if(selectedOptions[i].metric === 'Материалы' && type === 'Material'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Ширина' && type === 'Width'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Высота' && type === 'Height'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Глубина' && type === 'Depth'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Длина' && type === 'Length'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Диаметр' && type === 'Diameter'){
                return selectedOptions[i].value
            } else if(selectedOptions[i].metric === 'Вес' && type === 'Weigth'){
                return selectedOptions[i].value
            }
        } 
    }

    //
    const makeScroll = () => {
        return (window.innerWidth > 724 && photos.length >= 7) 
                || 
                (window.innerWidth <= 724 && photos.length >= 3) 
                    ? 'scroll' 
                        : 'none'
    }

    //request to add product in catalog
    const addProductInCatalog = () => {
        axios.post('https://api.native-flora.tk/Item/Add', {
            
                "name": name,
                "description": discription.split('.'),
                "price": +price,
                "icon": photos,
                "sizes": {
                    "Material": getValueByMetricName(selectedOptions, "Material") || null,
                    "Weigth":  getValueByMetricName(selectedOptions, "Weigth") || null,
                    "Height": getValueByMetricName(selectedOptions, "Height") || null,
                    "Depth": getValueByMetricName(selectedOptions, "Depth") || null,
                    "Diameter": getValueByMetricName(selectedOptions, "Diameter") || null,
                    "Width":  getValueByMetricName(selectedOptions, "Width") || null,
                    "Length": getValueByMetricName(selectedOptions, "Length") || null,
                }
        }, {
            headers:{
                'x-access-token': localStorage.getItem('accessToken')
            }
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    // clears all fields
    const clearAll = () => {
        setPhotos([]);
        setDiscription('');
        setName('');
        setPrice('');
        setMetricsListStep([])
    }
  return (
    <div className='addedFieldAdmine'>
        <div className='photoAndDiscriptionContainer'>
            <div 
                className='listOfSelectedImages' 
                style={
                  {
                    overflowX: makeScroll()
                  }
                }>
                {
                    photos.map(photo=>(
                        <img key={photo} 
                             src={photo} 
                             className='selectedImage' 
                             style={
                                {
                                    scrollSnapAlign: 'start'
                                }
                             }
                             alt='photo' 
                             onClick={() => setPhotos(photos.filter(item => item !== photo))
                        }/>
                    ))
                }
                <Picker setPhotos={setPhotos} photos={photos} className='addedFileBTN' />
            </div>
            <div className='discriptionContainer'>
                <p>Описание:</p>
                <textarea 
                    placeholder='Введите описание товара' 
                    onChange={(event) => setDiscription(event.target.value)}
                    value={discription}
                />
            </div>
        </div>
        <div className='metricContainer_Admine'>
            <div className='nameContainer'>
                <h4>Наименование:</h4>
                <form>
                    <input 
                        className='nameField' 
                        placeholder='Наименование' 
                        onChange={(event)=>setName(event.target.value)}
                        value={name}
                    />
                </form>
            </div>
            <div className='priceContainer'>
                <h4>Цена:</h4>
                <form>
                    <input 
                        className='priceField' 
                        placeholder='10' 
                        onChange={(event)=>setPrice(event.target.value)}
                        value={price}
                    />
                    <span>BYN</span>
                </form>
            </div>
            <div className='metricCart'>
                <h4>Параметры:</h4>
                {
                    metricsListStep.map( (el, index) => (
                        <div className='metric' key={el} >
                            <SingleSelect 
                                options = { filter(OptionsOfMetrics, selectedOptions) } 
                                width={'60%'}
                                index={index}
                                selectedOptions = {selectedOptions}
                                setSelectedOptions = {setSelectedOptions}
                                type={'metric'}
                            />
                            <input 
                                className='metricInput' 
                                type={selectedOptions[index].metric === 'Материалы' ? 'text' : 'number'}
                                min={0}
                                onChange={event => {
                                    let newArray = [...selectedOptions];
                                    newArray[index] = {...newArray[index], value: event.target.value};
                                    setSelectedOptions(newArray)
                                }}
                                placeholder='ввод'
                            />
                            <svg
                                width="15" height="15" viewBox="0 0 15 15" fill="none" 
                                onClick={()=>{
                                    setMetricsListStep([...metricsListStep.filter(item=>item!==el)]);
                                    setSelectedOptions([...selectedOptions.filter(item=>item!==selectedOptions[index])])
                                }}
                            > 
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" /> 
                            </svg>
                        </div>
                    ))
                }
                <button 
                    className='deleteMetricBtnField'
                    onClick={()=>{
                        setMetricsListStep([...metricsListStep, Math.random().toFixed(4)])
                        setSelectedOptions([...selectedOptions, Math.random().toFixed(2)])
                    }}
                    style={{display: metricsListStep.length >= 7 && 'none'}}
                ><span className='deleteMetricBtn'>Добавить</span></button>
            </div>
            <div className='createCartField'>
                <button 
                    className='createCartBTN'
                    onClick={()=>{
                        refreshFunction(dispatch, addProductInCatalog)
                        clearAll()
                    }}
                >Создать</button>
            </div>
        </div>
        {/* <Picker setPhotos={setPhotos} photos={photos}/> */}
    </div>
  )
}
