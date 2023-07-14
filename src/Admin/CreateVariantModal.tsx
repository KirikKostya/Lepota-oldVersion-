import React, {useState} from 'react';
import { ICreateVariantProps } from './Update/Interfaces/Interface';
import { createVariant } from './AdmineController';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Slider from '../Slider/Slider';
import ReactModal from 'react-modal';
import Picker from './Picker';
import './Style/CreateVariantModal.css';

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
                ?  <Slider>
                      {
                        addedPhotos.map(img=>(
                            <img key={img} src={ img } alt='something'/>
                        ))
                      }
                    </Slider>
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
                                  fetchProducts(+localStorage.getItem('searchOrderById')!);
                createVariant(localStorage.getItem('searchOrderById') || '{}', variantName, variantPrice, addedPhotos, setError, dispatch, ()=>fetchProducts(+localStorage.getItem('searchOrderById')!));
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