import React, {useEffect} from 'react'
import useDrivePicker from 'react-google-drive-picker'

export default function Picker({setPhotos, photos, className}) {
    const [openPicker] = useDrivePicker();  

    const handleOpenPicker = () => {
        openPicker({
            clientId: "317626937561-a7m6sov8ad0soceqdibi91krqsipmpkr.apps.googleusercontent.com",
            developerKey: "AIzaSyBl1gGShpvgudpoZ67gofHb-kfNfToUZ3E",
            viewId: "DOCS",
            // token: 'ya29.a0Ael9sCNoDu24h2lP8deHKtP9M89XnT_6dBjOY9Z1xpsczAkjmC3QIgQlJnoympuQsLgpJD1rf6PUGfYg_Iia5b5JmMSnY0gCZ2Jep-1nMv1FmeBuAfBoioWRfbTcFzX9q64Ds9jz6_bqIiitvsRATbJjI2M8aCgYKAXkSARMSFQF4udJhoMAdO2l9g2cUrTCp_bQMIw0163',
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            customScopes: ['https://www.googleapis.com/auth/drive'],
            callbackFunction: (data) => {
                let newArray = [...photos];
                data.docs.forEach(el=>newArray.push(`https://drive.google.com/uc?export=view&id=${el.url.replace('https://drive.google.com/file/d/', '').replace('/view?usp=drive_web', '')}`))
                setPhotos(newArray);
                // console.log(photos)
            },
        })
    }

  return (
    <button onClick={handleOpenPicker} className={className}>
        <p>+</p>
        <span>Загрузить фото</span>
    </button>
  )
}
