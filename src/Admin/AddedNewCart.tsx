import React, { useState } from 'react';
import SingleSelect from '../DropDowns/SingleSelect';
import CrossIcon from '../Icons/CrossIcon';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';
import { IOption, ISelectOption } from './Update/Interfaces/Interface';
import { OptionsOfMetrics } from '../DropDowns/OptionList';
import { SubmitHandler, useForm } from 'react-hook-form';
import { refreshFunction } from '../MainFiles/App';
import { useDispatch } from 'react-redux';
import Picker from './Picker';
import axios from 'axios';
import './Style/AddedNewCart.css'

//gets value of metric by metric name
export const getValueByMetricName = (selectedOptions:ISelectOption[], type:string) => {
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

        return null;
    } 
}

interface INewItem{
    name: string
    price: string
}

const AddedNewCart: React.FC = () => {
    
    const [photos, setPhotos] = useState<string[]>([]);
    const [description, setDesctiption] = useState<string>('');

    const [metricsListStep, setMetricsListStep] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>([]);

    const { register, handleSubmit, reset, formState: {errors} } = useForm<INewItem>();
    const dispatch = useDispatch()

    //filter option on select
    const filter = (optionList:IOption[], selectedList:ISelectOption[]):IOption[] => {
        let newArray:IOption[] = [...optionList];
        for(let i=0; i<selectedList.length; i++){
            newArray = [...newArray.filter(el=> el.value !== selectedList[i].metric)]
        }
        return newArray
    }

    //adds scroll to photo list 
    const makeScroll = ():string => {
        return (window.innerWidth > 724 && photos.length >= 7) 
                || 
                (window.innerWidth <= 724 && photos.length >= 3) 
                    ? 'scroll' 
                        : 'none'
    }

    const onSubmit: SubmitHandler<INewItem> = (data) => {
        refreshFunction(dispatch, ()=>{
            dispatch(loadingUncomplate());
            axios.post('https://api.native-flora.tk/Item/Add', {
                    "name": data.name,
                    "description": description,
                    "price": +data.price,
                    "icon": photos,
                    "sizes": {
                        "Depth": getValueByMetricName(selectedOptions, "Depth"),
                        "Diameter": getValueByMetricName(selectedOptions, "Diameter"),
                        "Height": getValueByMetricName(selectedOptions, "Height"),
                        "Length": getValueByMetricName(selectedOptions, "Length"),
                        "Material": getValueByMetricName(selectedOptions, "Material"),
                        "Weight": getValueByMetricName(selectedOptions, "Weight"),
                        "Width":  getValueByMetricName(selectedOptions, "Width"),
                    }
            }, {
                headers:{
                    'x-access-token': localStorage.getItem('accessToken')
                }
            })
            .then(clearAll)
            .catch(err=>console.log(err))
            dispatch(loadingComplate())
        })
    }
    // clears all fields
    const clearAll = ():void => {
        setMetricsListStep([]);
        setDesctiption('');
        setPhotos([]);
        reset();
    }

  return (
    <div className='addedFieldAdmine'>
        <div className='photoAndDescriptionContainer'>
            <div className='listOfSelectedImages'>
                {
                    photos.map(photo=>(
                        <img key={photo} 
                             src={photo} 
                             className='selectedImage' 
                             style={ { scrollSnapAlign: 'start' } }
                             alt='photo' 
                             onClick={() => setPhotos(photos.filter(item => item !== photo))}
                        />
                    ))
                }
                <Picker setPhotos={setPhotos} photos={photos} className='addedFileBTN' />
            </div>
            <div className='descriptionContainer'>
                <p>Описание:</p>
                <textarea 
                    placeholder='Введите описание товара' 
                    autoComplete='off'
                    onChange={(event)=>setDesctiption(event.target.value)}
                    value={description}
                />
            </div>
        </div>
        <form className='metricContainerAdmine' onSubmit={handleSubmit(onSubmit)}>
            <div className='nameContainer'>
                <h4>Наименование:</h4>
                    <input 
                        className='nameField' 
                        placeholder='Наименование'
                        autoComplete='off' 
                        {...register('name', {required: 'Обязательное поле !'})}
                        />
                    {errors?.name && <span className='requiredField message'>{errors.name.message}</span>}
            </div>
            <div className='priceContainer'>
                <h4>Цена:</h4>
                <div className='fullPriceField'>
                    <input 
                        placeholder='10' 
                        autoComplete='off'
                        { ...register('price') }
                    />
                    <span style={{height: '100%', display: 'flex', alignItems:'center', padding: '0 0 0 10px '}}>BYN</span>
                </div>
            </div>
            <div className='metricCart'>
                <h4>Параметры:</h4>
                {
                    metricsListStep.map( (el:string, index:number) => (
                        <div className='metric' key={el} >
                            <SingleSelect
                                options={filter(OptionsOfMetrics, selectedOptions)}
                                width={'60%'}
                                index={index}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                type={'metric'} 
                            />
                            <input 
                                className='metricInput' 
                                type={selectedOptions[index].metric === 'Материалы' ? 'text' : 'number'}
                                min={0}
                                step={0.1}
                                onChange={event => {
                                    let newArray = [...selectedOptions];
                                    newArray[index] = {...newArray[index], value: event.target.value};
                                    setSelectedOptions(newArray)
                                }}
                                placeholder='ввод'
                                autoComplete='off'
                            />
                            <CrossIcon 
                                onClick={()=>{
                                    setMetricsListStep([...metricsListStep.filter(item=>item!==el)]);
                                    setSelectedOptions([...selectedOptions.filter(item=>item!==selectedOptions[index])])
                                }} />
                        </div>
                    ))
                }
                <div 
                    className='deleteMetricBtnField'
                    onClick={()=>{
                        setMetricsListStep([...metricsListStep, Math.random().toFixed(4)]);
                        setSelectedOptions([...selectedOptions, { id: Math.random().toFixed(2), metric: '', value: '' }])
                    }}
                    style={{display: metricsListStep.length >= 7 ? 'none' : 'block'}}
                >
                    <button type='button' className='deleteMetricBtn'>Добавить</button>
                </div>
            </div>
            <div className='createCartField'>
                <button className='createCartBTN' >Создать</button>
            </div>
        </form>
    </div>
  )
}

export default AddedNewCart;