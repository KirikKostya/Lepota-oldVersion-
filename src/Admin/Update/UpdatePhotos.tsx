import React, {useState} from 'react'
import { IUpdatePhotosProps } from './Interfaces/Interface'
import { updatePhotos } from '../AdmineController'
import { refreshFunction } from '../../MainFiles/App'
import { useDispatch } from 'react-redux'
import ReactModal from 'react-modal'
import Picker from '../Picker'
import './Style/UpdateCSS.css'

export default function UpdatePhotos(props: IUpdatePhotosProps) {
    
    const {isOpen, photos, setIsOpen} = props;

    const [photoList, setPhotoList] = useState<string[]>(photos);
    const dispatch = useDispatch();

    const styleForPicker = {
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

    const handlerChange = () => {
        updatePhotos(localStorage.getItem('searchOrderById') || '{}', photoList, dispatch);
        setIsOpen(false);
    }
    
  return (
    <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Selected Option"
    >
        <h2>Изменить фотографии</h2>
        <div className='listPhotos'>
            {
                photoList.map(photo=>(
                    <img key={photo} src={photo} alt='photo' className='examplePhoto' onClick={()=>setPhotoList(photoList.filter(item => item !== photo))}/>
                ))
            }
            <Picker photos={photoList} setPhotos={setPhotoList} style={styleForPicker} className={undefined}/>
        </div>
        <div className='updateBTNS'>
            <button 
                className='modal-closeBTN'
                onClick={()=>refreshFunction(dispatch, handlerChange) }
            >
                Изменить
            </button>
            <p
             onClick={()=>setIsOpen(false)}
             style={{margin:'0', cursor:'pointer'}}>закрыть</p>
        </div>
    </ReactModal>
  )
}
