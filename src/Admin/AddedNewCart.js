import React, {useState} from 'react'
import SingleSelect from '../DropDowns/SingleSelect'
import {OptionsOfMetrics} from '../DropDowns/OptionList'
import { refreshFunction } from '../MailFiles/App';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Style/AddedNewCart.css'
import Picker from './Picker';
import CrossIcon from '../Icons/CrossIcon';

export default function AddedNewCart() {
    
    const [photos, setPhotos] = useState(Array);
    const [description, setDescription] = useState('');
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
            } else if(selectedOptions[i].metric === 'Вес' && type === 'Weight'){
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
                "description": description.split('.'),
                "price": +price,
                "icon": photos,
                "sizes": {
                    "Material": getValueByMetricName(selectedOptions, "Material") || null,
                    "Weight":  getValueByMetricName(selectedOptions, "Weight") || null,
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
        setDescription('');
        setName('');
        setPrice('');
        setMetricsListStep([])
    }
  return (
    <div className='addedFieldAdmine'>
        <div className='photoAndDescriptionContainer'>
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
            <div className='descriptionContainer'>
                <p>Описание:</p>
                <textarea 
                    placeholder='Введите описание товара' 
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
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
                            <CrossIcon 
                                onClick={()=>{
                                    setMetricsListStep([...metricsListStep.filter(item=>item!==el)]);
                                    setSelectedOptions([...selectedOptions.filter(item=>item!==selectedOptions[index])])
                                }} />
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
    </div>
  )
}
