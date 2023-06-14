import React from 'react'
import useDrivePicker from 'react-google-drive-picker'
import CameraIcon from '../Icons/CameraIcon';

interface IPickerProps {
  setPhotos: React.Dispatch<React.SetStateAction<string[]>> 
  photos: string[]
  className: string,
  style: {},
}

const Picker: React.FC<IPickerProps> = (props) => {
  
  const { setPhotos, photos, className, style } = props;

  const [openPicker] = useDrivePicker();  

  const handleOpenPicker = () => {
      openPicker({
          clientId: "317626937561-a7m6sov8ad0soceqdibi91krqsipmpkr.apps.googleusercontent.com",
          developerKey: "AIzaSyBl1gGShpvgudpoZ67gofHb-kfNfToUZ3E",
          viewId: "DOCS",
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          customScopes: ['https://www.googleapis.com/auth/drive'],
          callbackFunction: (data) => {
              let newArray = [...photos];
              data.docs.forEach(el => newArray.push(`https://drive.google.com/uc?export=view&id=${el.url.replace('https://drive.google.com/file/d/', '').replace('/view?usp=drive_web', '')}`))
              setPhotos(newArray);
          }
      })
  }

  return (
    <>
      {
        className
        ? <button onClick={handleOpenPicker} className={className} style={style}>
            <p>+</p>
            <span>Загрузить фото</span>  
          </button>
          : <CameraIcon onClick={handleOpenPicker}/>
      }
    </>
  )
}

export default Picker;