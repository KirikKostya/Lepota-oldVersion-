// import React, {useState} from 'react';
// import CrossIcon from '../Icons/CrossIcon';
// import SingleSelect from '../DropDowns/SingleSelect';
// import {IOption, ISelectOption} from './Update/Interfaces/Interface';
// import {OptionsOfMetrics} from '../DropDowns/OptionList.ts'
// import { refreshFunction } from '../MailFiles/App';
// import { useDispatch } from 'react-redux';
// import Picker from './Picker';
// import axios from 'axios';
// import './Style/AddedNewCart.css'

// //gets value of metric by metric name
// export const getValueByMetricName = (selectedOptions:Array<ISelectOption>, type:string) => {
//     for(let i=0; i<selectedOptions.length; i++){
//         if(selectedOptions[i].metric === 'Материалы' && type === 'Material'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Ширина' && type === 'Width'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Высота' && type === 'Height'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Глубина' && type === 'Depth'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Длина' && type === 'Length'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Диаметр' && type === 'Diameter'){
//             return selectedOptions[i].value
//         } else if(selectedOptions[i].metric === 'Вес' && type === 'Weight'){
//             return selectedOptions[i].value
//         }
//     } 
// }

// export default function AddedNewCart(){
    
//     const [photos, setPhotos] = useState<Array<string>>([]);
//     const [description, setDescription] = useState<string>('');
//     const [name, setName] = useState<string>('');
//     const [price, setPrice] = useState<string>('');

//     const [metricsListStep, setMetricsListStep] = useState<Array<string>>([]);
//     const [selectedOptions, setSelectedOptions] = useState<Array<ISelectOption | string>>([]);

//     const dispatch = useDispatch()

//     //filter option on select
//     const filter = (optionList:Array<IOption>, selectedList:Array<ISelectOption>) => {
//         let newArray:Array<IOption> = [...optionList];
//         for(let i=0; i<selectedList.length; i++){
//             newArray = [...newArray.filter(el=> el.value !== selectedList[i].metric)]
//         }
//         return newArray
//     }

//     //adds scroll to photo list 
//     const makeScroll = () => {
//         return (window.innerWidth > 724 && photos.length >= 7) 
//                 || 
//                 (window.innerWidth <= 724 && photos.length >= 3) 
//                     ? 'scroll' 
//                         : 'none'
//     }

//     //request to add product in catalog
//     const addProductInCatalog = () => {
//         dispatch({type: 'LOADING_IS_UNCOMPLETED'});
//         axios.post('https://api.native-flora.tk/Item/Add', {
//                 "name": name,
//                 "description": description.split('.'),
//                 "price": +price,
//                 "icon": photos,
//                 "sizes": {
//                     "Material": getValueByMetricName(selectedOptions, "Material"),
//                     "Weight": getValueByMetricName(selectedOptions, "Weight"),
//                     "Height": getValueByMetricName(selectedOptions, "Height"),
//                     "Depth": getValueByMetricName(selectedOptions, "Depth"),
//                     "Diameter": getValueByMetricName(selectedOptions, "Diameter"),
//                     "Width":  getValueByMetricName(selectedOptions, "Width"),
//                     "Length": getValueByMetricName(selectedOptions, "Length"),
//                 }
//         }, {
//             headers:{
//                 'x-access-token': localStorage.getItem('accessToken')
//             }
//         })
//         .then(res=>console.log(res))
//         .catch(err=>console.log(err))
//         dispatch({type: 'LOADING_IS_COMPLETED'})
//     }

//     // clears all fields
//     const clearAll = () => {
//         setPhotos([]);
//         setDescription('');
//         setName('');
//         setPrice('');
//         setMetricsListStep([])
//     }

//   return (
//     <div className='addedFieldAdmine'>
//         <div className='photoAndDescriptionContainer'>
//             <div 
//                 className='listOfSelectedImages' 
//                 // style={ { overflowX: makeScroll() } }
//             >
//                 {
//                     photos.map(photo=>(
//                         <img key={photo} 
//                              src={photo} 
//                              className='selectedImage' 
//                              style={ { scrollSnapAlign: 'start' } }
//                              alt='photo' 
//                              onClick={() => setPhotos(photos.filter(item => item !== photo))}
//                         />
//                     ))
//                 }
//                 <Picker setPhotos={setPhotos} photos={photos} className='addedFileBTN' style={null} />
//             </div>
//             <div className='descriptionContainer'>
//                 <p>Описание:</p>
//                 <textarea 
//                     placeholder='Введите описание товара' 
//                     onChange={(event) => setDescription(event.target.value)}
//                     value={description}
//                 />
//             </div>
//         </div>
//         <div className='metricContainerAdmine'>
//             <div className='nameContainer'>
//                 <h4>Наименование:</h4>
//                 <form>
//                     <input 
//                         className='nameField' 
//                         placeholder='Наименование' 
//                         onChange={(event)=>setName(event.target.value)}
//                         value={name}
//                     />
//                 </form>
//             </div>
//             <div className='priceContainer'>
//                 <h4>Цена:</h4>
//                 <form>
//                     <input 
//                         className='priceField' 
//                         placeholder='10' 
//                         onChange={(event)=>setPrice(event.target.value)}
//                         value={price}
//                     />
//                     <span>BYN</span>
//                 </form>
//             </div>
//             <div className='metricCart'>
//                 <h4>Параметры:</h4>
//                 <button onClick={()=>console.log(OptionsOfMetrics, selectedOptions)}>123</button>
//                 {
//                     metricsListStep.map( (el:string, index:number) => (
//                         <div className='metric' key={el} >
//                             <SingleSelect
//                                 options={filter(OptionsOfMetrics, selectedOptions)}
//                                 width={'60%'}
//                                 index={index}
//                                 selectedOptions={selectedOptions}
//                                 setSelectedOptions={setSelectedOptions}
//                                 type={'metric'} 
//                             />
//                             <input 
//                                 className='metricInput' 
//                                 type={selectedOptions[index].metric === 'Материалы' ? 'text' : 'number'}
//                                 min={0}
//                                 onChange={event => {
//                                     let newArray = [...selectedOptions];
//                                     newArray[index] = {...newArray[index], value: event.target.value};
//                                     setSelectedOptions(newArray)
//                                 }}
//                                 placeholder='ввод'
//                             />
//                             <CrossIcon 
//                                 onClick={()=>{
//                                     setMetricsListStep([...metricsListStep.filter(item=>item!==el)]);
//                                     setSelectedOptions([...selectedOptions.filter(item=>item!==selectedOptions[index])])
//                                 }} />
//                         </div>
//                     ))
//                 }
//                 <button 
//                     className='deleteMetricBtnField'
//                     onClick={():void=>{
//                         // setMetricsListStep([...metricsListStep])
//                         // setSelectedOptions([...selectedOptions])
//                         console.log([...metricsListStep, Math.random().toFixed(4)], [...selectedOptions, Math.random().toFixed(2)])
//                         setMetricsListStep([...metricsListStep, {metric: '', value: `${Math.random().toFixed(4)}`}])
//                         setSelectedOptions([...selectedOptions, Math.random().toFixed(2)])
//                     }}
//                     style={{display: metricsListStep.length >= 7 ? 'none' : 'block'}}
//                 ><span className='deleteMetricBtn'>Добавить</span></button>
//             </div>
//             <div className='createCartField'>
//                 <button 
//                     className='createCartBTN'
//                     onClick={()=>{
//                         refreshFunction(dispatch, addProductInCatalog);
//                         clearAll()
//                     }}
//                 >Создать</button>
//             </div>
//         </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import SingleSelect from '../DropDowns/SingleSelect';
import CrossIcon from '../Icons/CrossIcon';
import { OptionsOfMetrics } from '../DropDowns/OptionList.tsx';
import { refreshFunction } from '../MailFiles/App';
import { useDispatch } from 'react-redux';
import Picker from './Picker';
import axios from 'axios';
import './Style/AddedNewCart.css';
import { IOption } from './Update/Interfaces/Interface';

interface SelectedOption {
  metric: string;
  value: string;
}

export const getValueByMetricName = (selectedOptions: SelectedOption[], type: string): string | undefined => {
  for (let i = 0; i < selectedOptions.length; i++) {
    const { metric, value } = selectedOptions[i];
    if (metric === 'Материалы' && type === 'Material') {
      return value;
    } else if (metric === 'Ширина' && type === 'Width') {
      return value;
    } else if (metric === 'Высота' && type === 'Height') {
      return value;
    } else if (metric === 'Глубина' && type === 'Depth') {
      return value;
    } else if (metric === 'Длина' && type === 'Length') {
      return value;
    } else if (metric === 'Диаметр' && type === 'Diameter') {
      return value;
    } else if (metric === 'Вес' && type === 'Weight') {
      return value;
    }
  }
  return undefined;
};

export default function AddedNewCart() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [metricsListStep, setMetricsListStep] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const dispatch = useDispatch();

  const filterOptions = (optionList: IOption[], selectedList: SelectedOption[]): string[] => {
    let newArray = [...optionList];
    for (let i = 0; i < selectedList.length; i++) {
      newArray = [...newArray.filter((el) => el.label !== selectedList[i].metric)];
    }
    return newArray;
  };

  const makeScroll = (): string => {
    return (window.innerWidth > 724 && photos.length >= 7) || (window.innerWidth <= 724 && photos.length >= 3)
      ? 'scroll'
      : 'none';
  };

  const addProductInCatalog = () => {
    dispatch({ type: 'LOADING_IS_UNCOMPLETED' });
    axios
      .post(
        'https://api.native-flora.tk/Item/Add',
        {
          name,
          description: description.split('.'),
          price: +price,
          icon: photos,
          sizes: {
            Material: getValueByMetricName(selectedOptions, 'Material'),
            Weight: getValueByMetricName(selectedOptions, 'Weight'),
            Height: getValueByMetricName(selectedOptions, 'Height'),
            Depth: getValueByMetricName(selectedOptions, 'Depth'),
            Diameter: getValueByMetricName(selectedOptions, 'Diameter'),
            Width: getValueByMetricName(selectedOptions, 'Width'),
            Length: getValueByMetricName(selectedOptions, 'Length'),
          },
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken') || '',
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: 'LOADING_IS_COMPLETED' }));
  };

  const clearAll = () => {
    setPhotos([]);
    setDescription('');
    setName('');
    setPrice('');
    setMetricsListStep([]);
  };

  return (
    <div className="addedFieldAdmine">
      <div className="photoAndDescriptionContainer">
        <div className="listOfSelectedImages" 
// style={{ overflowX: makeScroll() }}
            >
          {photos.map((photo) => (
            <img
              key={photo}
              src={photo}
              className="selectedImage"
              style={{ scrollSnapAlign: 'start' }}
              alt="photo"
              onClick={() => setPhotos(photos.filter((item) => item !== photo))}/>
          ))}
          <Picker setPhotos={setPhotos} photos={photos} className="addedFileBTN" style={undefined}/>
        </div>
        <div className="descriptionContainer">
          <p>Описание:</p>
          <textarea
            placeholder="Введите описание товара"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
      </div>
      <div className="metricContainerAdmine">
        <div className="nameContainer">
          <h4>Наименование:</h4>
          <form>
            <input
              className="nameField"
              placeholder="Наименование"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </form>
        </div>
        <div className="priceContainer">
          <h4>Цена:</h4>
          <form>
            <input
              className="priceField"
              placeholder="10"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
            />
            <span>BYN</span>
          </form>
        </div>
        <div className="metricCart">
          <h4>Параметры:</h4>
          {metricsListStep.map((el, index) => (
            <div className="metric" key={el}>
              <SingleSelect
                options={filterOptions(OptionsOfMetrics, selectedOptions)}
                width={'60%'}
                index={index}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                type={'metric'}
              />
              <input
                className="metricInput"
                type={selectedOptions[index].metric === 'Материалы' ? 'text' : 'number'}
                min={0}
                onChange={(event) => {
                  let newArray = [...selectedOptions];
                  newArray[index] = { ...newArray[index], value: event.target.value };
                  setSelectedOptions(newArray);
                }}
                placeholder="ввод"
              />
              <CrossIcon
                onClick={() => {
                  setMetricsListStep([...metricsListStep.filter((item) => item !== el)]);
                  setSelectedOptions([...selectedOptions.filter((item) => item !== selectedOptions[index])]);
                }}
              />
            </div>
          ))}
          <button
            className="deleteMetricBtnField"
            onClick={() => {
              setMetricsListStep([...metricsListStep, Math.random().toFixed(4)]);
              setSelectedOptions([...selectedOptions]);
            }}
            style={{ display: metricsListStep.length >= 7 ? 'none' : undefined }}
          >
            <span className="deleteMetricBtn">Добавить</span>
          </button>
        </div>
        <div className="createCartField">
          <button className="createCartBTN" onClick={() => {refreshFunction(dispatch, addProductInCatalog); clearAll();}}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}