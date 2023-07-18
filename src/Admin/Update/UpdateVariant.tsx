import React, { useState } from 'react';
import { IUpdateVariantProps } from './Interfaces/Interface';
import { refreshFunction } from '../../MainFiles/App'
import { updateVariant } from '../AdmineController';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import Picker from '../Picker';
import './Style/UpdateCSS.css';

const UpdateVariant: React.FC<IUpdateVariantProps> = (props) => {
    
    const { isOpen, variant, setIsOpen } = props;

    const [variantPhotos, setVariantPhotos] = useState<string[]>([...variant.icon]);
    const [variantName, setVariantName] = useState<string>(variant.name);
    const [variantPrice, setVariantPrice] = useState<string>(variant.price);

    const dispatch = useDispatch();

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
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
                onClick={()=>setIsOpen(false)}
            />
            Изменить вариант
        </h2>
        {/* <div className='listOfSelectedImages'>
            {
                variantPhotos.length != 0
                &&
                variantPhotos.map(photo=>(
                    <Image key={photo} 
                        src={photo}
                        width={'100px'} height={'100px'} fallback={require('../../Photos/somethingWentWrong.png')}
                        onClick={() => setVariantPhotos(variantPhotos.filter(item => item !== photo))}
                    />
                ))
            }
            <Picker setPhotos={setVariantPhotos} photos={variantPhotos} className='addedFileBTN' />
        </div> */}
        <div className='formContainer'>
            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} defaultValue={variant.name}/>
            <input placeholder='Цена' style={{width: '50px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)} defaultValue={variant.price}/>
            <Picker photos={variantPhotos} setPhotos={setVariantPhotos} style={styleForPicker} className={undefined}/>
        </div>
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN'
                onClick={()=>{
                    refreshFunction(dispatch, ()=>{
                        setIsOpen(false);
                        updateVariant(localStorage.getItem('searchOrderById')!, variant.id, variantName, variantPrice, variantPhotos, dispatch)});
                    }
                }
            >
                Изменить
            </button>
        </div>
    </ReactModal>
  )
}

export default UpdateVariant;