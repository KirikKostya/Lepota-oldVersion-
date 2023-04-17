import React, {useState} from 'react'
import './Style/AddedNewCart.css'

export default function AddedNewCart() {
    
    const [photos, setPhotos] = useState(Array);

    const makeListOfAddedPhotos = (event)=>{
        if (event.target.files && event.target.files[0]) {
          setPhotos([...photos, URL.createObjectURL(event.target.files[0])])
        }
    }

  return (
    <div className='addedFieldAdmine'>
        <div className='photoAndDiscriptionContainer'>
            <div className='listOfSelectedImages'>
                {
                    photos.map(photo=>(
                        <img key={photo} src={photo} className='selectedImage' alt='photo' onClick={()=>{
                            setPhotos(photos.filter(item => item !== photo))
                            console.log(photos)
                            }
                        }/>
                    ))
                }
                <label className='addedFileBTN'>
                    <p>+</p>
                    <input type='file' onChange={(e)=>makeListOfAddedPhotos(e)} multiple style={{display: 'none'}}/>
                    <span>Загрузить фото</span>
                </label>
            </div>
            <div className='discriptionContainer'>
                <p>Описание:</p>
                <textarea placeholder='Введите описание товара'/>
            </div>
        </div>
        <div className='metricContainer_Admine'>
            <div className='priceContainer'>
                <h3>Цена:</h3>
                <form>
                    <input className='priceField' placeholder='10'/>
                    <span>BYN</span>
                </form>
            </div>
            <div className='metricCart'>
                <h3>Цена:</h3>
                <form>
                    <span className='metricName'>Материал: </span>
                    <input className='metricInput' placeholder='Гипс'/>
                    <span className='metricType'></span>
                </form>
                <form>
                    <span className='metricName'>Длина: </span>
                    <input className='metricInput' placeholder='100'/>
                    <span className='metricType'>см</span>
                </form>
                <form>
                    <span className='metricName'>Ширина: </span>
                    <input className='metricInput' placeholder='21'/>
                    <span className='metricType'>см</span>
                </form>
                <form>
                    <span className='metricName'>Глубина: </span>
                    <input className='metricInput' placeholder='7'/>
                    <span className='metricType'>см</span>
                </form>
                <form>
                    <span className='metricName'>Диаметр: </span>
                    <input className='metricInput' placeholder='8'/>
                    <span className='metricType'>см</span>
                </form>
                <form>
                    <span className='metricName'>Вес: </span>
                    <input className='metricInput' placeholder='2.1'/>
                    <span className='metricType'>кг</span>
                </form>
            </div>
            <div className='createCartField'>
                <button className='createCartBTN'>Создать</button>
            </div>
        </div>
    </div>
  )
}
