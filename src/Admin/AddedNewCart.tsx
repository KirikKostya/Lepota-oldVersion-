import React, { useState, useEffect } from 'react';
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
import Modal from 'antd/es/modal/Modal';
import { Radio, Select } from 'antd';
import InfoIcon from '../Icons/InfoIcon';

interface INewArray{
    label: string 
    value: string 
}

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
    const [isAKit, setIsAKit] = useState<boolean>(false);

    const [parentOptions, setParentOptions] = useState<INewArray[]>([{label: '', value: ''}]);
    const [parentId, setParentId] = useState<string>('null');
    const [fullData, setFullData] = useState<INewItem>({name: '', price: ''});
    const [addedModal, setAddedModal] = useState<boolean>(false);

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

    const onSubmit: SubmitHandler<INewItem> = (data) => {
        setFullData(data);
        setAddedModal(true);
    }

    // clears all fields
    const clearAll = ():void => {
        setMetricsListStep([]);
        setDesctiption('');
        setPhotos([]);
        reset();
    }

    const addedCart = (data: INewItem) => {
        dispatch(loadingUncomplate())
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
                    },
                    "isAKit": isAKit,
                    "parentId": parentId,
                    "type": ''
            }, {
                headers:{
                    'x-access-token': localStorage.getItem('accessToken')
                }
            })
            .then(clearAll)
            .catch(err=>console.log(err))
            dispatch(loadingComplate())
        })
        setAddedModal(false);
        dispatch(loadingComplate())
    }

    useEffect(() => {
        axios.get(`https://api.native-flora.tk/Item/GetAll`)
          .then(res=>setParentOptions([{value: 'null', label: 'Новый товар'}, ...res.data.data.map((el: any)=>{ return {value: el.id, label: el.name} }).filter((el:any)=>el.label !== 'Комплекты')]));
    }, [])
    
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
                    className={`deleteMetricBtnField ${metricsListStep.length >= 7 && 'displayNone'}`}
                    onClick={()=>{
                        setMetricsListStep([...metricsListStep, Math.random().toFixed(4)]);
                        setSelectedOptions([...selectedOptions, { id: Math.random().toFixed(2), metric: '', value: '' }])
                    }}
                >
                    <button type='button' className='deleteMetricBtn' onClick={()=>console.log(metricsListStep.length >= 7 ? 'none' : 'block')}>Добавить</button>
                </div>
            </div>
            <div className='createCartField'>
                <button className='createCartBTN' >Создать</button>
            </div>
        </form>
        <Modal title={<InfoIcon width='1.25em' height='1.25em'/>} open={addedModal} onCancel={()=>setAddedModal(false)} cancelButtonProps={{style: {display: 'none'}}} okText='Создать' onOk={()=>addedCart(fullData)}>
            <div className='addedModal'>
                <div>
                    <h4 style={{margin: '0'}}>Это набор ?</h4>
                    <Radio.Group onChange={(e)=>setIsAKit(e.target.value)} value={isAKit}>
                        <Radio value={false}>НЕТ</Radio>
                        <Radio value={true}>ДА</Radio>
                    </Radio.Group>
                </div>
                <Select defaultValue={'Новый товар'} options={parentOptions} style={{width: '200px'}} onChange={(e)=>setParentId(e)}/>
            </div>
        </Modal>
    </div>
  )
}

export default AddedNewCart;