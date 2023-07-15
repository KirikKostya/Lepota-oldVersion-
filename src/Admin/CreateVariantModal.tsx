import React, { useState } from 'react';
import { ICreateVariantProps } from './Update/Interfaces/Interface';
import { createVariant } from './AdmineController';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Slider from '../Slider/Slider';
import ReactModal from 'react-modal';
import Picker from './Picker';
import './Style/CreateVariantModal.css';
import { Image } from 'antd';
import Carousel from 'react-material-ui-carousel';

const CreateVariantModal: React.FC<ICreateVariantProps> = (props: ICreateVariantProps) => {
    
    const {isOpen, setIsOpen, setError, cleanSelectedOptions, fetchProducts} = props;

    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [variantName, setVariantName] = useState<string>('');
    const [variantPrice, setVariantPrice] = useState<string>('');

    const dispatch = useDispatch()
    
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
        {
            addedPhotos.length != 0 
                ? <Carousel className='createVariantCarousel' autoPlay={false} navButtonsAlwaysVisible={true} navButtonsProps={{style: {width: '35px', height: '35px', display: `${addedPhotos.length <= 1 ? 'none' : 'flex'}`}}}>
                    {
                      addedPhotos.map(photo=>(
                        <Image key={photo} src={photo} width={'100%'} height={'250px'} fallback={require('../Photos/somethingWentWrong.png')}/>
                      ))
                    }
                  </Carousel>
                    : <h2 className='addVariantHeader'>
                        <FaChevronLeft 
                            style={{width: '10px', marginRight: '10px'}} 
                            onClick={()=>setIsOpen(false)}
                        /> 
                            Добавить вариант
                      </h2>
        }
        <div className='createContainer'>
            <input placeholder='Название' onChange={event=>setVariantName(event.target.value)} />
            <input placeholder='Цена' style={{width: '60px'}} type='number' min={'0'} onChange={event=>setVariantPrice(event.target.value)}/>
            <Picker photos={addedPhotos} setPhotos={setAddedPhotos} style={styleForPicker} className={undefined}/>
        </div>
        <button 
            className='modal-closeBTN variantBtn' 
            style={{margin: '15px 0 10px 0'}}
            onClick={async()=>{
                createVariant(localStorage.getItem('searchOrderById')!, variantName, variantPrice, addedPhotos, setError, dispatch, ()=>fetchProducts(+localStorage.getItem('searchOrderById')!));
                setIsOpen(false);
                cleanSelectedOptions()
            }}
        >
            создать
        </button>
    </ReactModal>
  )
}

export default CreateVariantModal;