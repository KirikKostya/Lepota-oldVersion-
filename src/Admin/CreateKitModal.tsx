import React, { useState } from 'react';
import { ICreateKitProps } from './Update/Interfaces/Interface';
import { FaChevronLeft } from 'react-icons/fa';
import { createKit } from './AdmineController';
import { useDispatch } from 'react-redux';
import { Image } from 'antd';
import Carousel from 'react-material-ui-carousel';
import ReactModal from 'react-modal';
import Picker from './Picker';
import './Style/CreateKit.css';

const CreateKitModal: React.FC<ICreateKitProps> = (props: ICreateKitProps) => {
    
    const { isOpen, setIsOpen, kitVariants, itemId, selectedVariants } = props;

    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [kitName, setKitName] = useState<string>('');
    const [kitPrice, setKitPrice] = useState<string>('');

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
        {
            addedPhotos.length != 0 
                ?  <Carousel className='createKitCarousel' autoPlay={false} navButtonsAlwaysVisible={true} navButtonsProps={{style: {width: '35px', height: '35px', display: `${addedPhotos.length <= 1 ? 'none' : 'flex'}`}}}>
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
                            Создать набор
                      </h2>
        }
        <div className='createContainer'>
            <input placeholder='Название' onChange={event=>setKitName(event.target.value)} defaultValue={selectedVariants.map(el=>el.name).join(' + ').toLowerCase()}/>
            <input placeholder='Цена' style={{width: '60px'}} type='number' min={'0'} onChange={event=>setKitPrice(event.target.value)}/>
            <Picker photos={addedPhotos} setPhotos={setAddedPhotos} className={undefined} style={styleForPicker} />
        </div>
        <button 
            className='modal-closeBTN variantBtn' 
            style={{margin: '15px 0 10px 0', color: `${kitName==='' && kitPrice === '' ? "white" : "black"}`, cursor: `${kitName==='' && kitPrice === '' ? 'not-allowed' : 'pointer'}`}}
            disabled={kitName === '' && kitPrice === ''}
            onClick={async()=>{
                createKit(itemId, kitName || selectedVariants.map(el=>el.name).join(' + ').toLowerCase(), kitVariants, addedPhotos, kitPrice, dispatch);
                setIsOpen(false)
            }}
        >
            создать
        </button>
    </ReactModal>
  )
}

export default CreateKitModal;