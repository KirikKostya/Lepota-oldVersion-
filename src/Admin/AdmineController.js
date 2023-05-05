import axios from 'axios'

const getUnit = (metricValue) => {
  return metricValue === 'Weight' 
          ? 'кг'
            : metricValue === 'Material'
              ? ''
                : 'см'
} 

const fetchProducts = (OpenID) => {
  axios.get(`https://api.native-flora.tk/Item/GetById?id=${OpenID || localStorage.getItem('searchOrderById')}`)
    .then(res=>{
      localStorage.setItem('variants', JSON.stringify(res.data.data.variants))
      console.log(res.data.data.variants)
      return res;
    })
}

export const checkIsAdmine = (dispatch) => {
    axios.get('https://api.native-flora.tk/Auth/IsAdmin', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(() => dispatch({type: 'IS_ADMIN'}))
    .catch(() => dispatch({type: 'IS_NOT_ADMIN'}))
  }

export const updateMetric = (id, metricValue, type) => {
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "sizes": {
            [type.replace('metric ', '')] : `${metricValue} ${getUnit(type.replace('metric ', ''))}`
      }}, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data)))
    .catch(err=>console.log(err))
}

export const updateName = (id, nameValue) => {
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "name": nameValue 
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data)))
    .catch(err=>console.log(err))
}

export const updateDescription = (id, descriptionValue) => {
  axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "description": descriptionValue.split('.')
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data)))
    .catch(err=>console.log(err))
}
export const createVariant = (itemId, Name, Price, Photos, setError)=>{
  axios.post(`https://api.native-flora.tk/Variant/Add`, {
        "itemId": itemId,
        "name": Name,
        "price": Price,
        "icon": Photos
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>{
      err.response.status === 400 && setError('Такой вариант уже существует!') 
      setTimeout(()=>setError(''), 4000)
      // console.log(typeof(setError))
    })
  // console.log(itemId, Name, Price, Photos)
}
export const deleteVariant = (itemId, variantId) => {
  console.log(itemId, variantId)
  axios.post(`https://api.native-flora.tk/Variant/Delete`, {
        "itemId": itemId,
        "variantId": variantId
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

export const updateVariant = (itemId, variantId, name, price, photos) => {
  axios.post(`https://api.native-flora.tk/Variant/Update`, {
        "itemId": itemId,
        "variantId": variantId,
        "name": name,
        "price": price,
        "icon": photos,
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .catch(err=>console.log(err))
}

export const createKit = (itemId, name, variants, photos, price) => {
  // console.log(name, variants, price, photos, itemId)
  axios.post(`https://api.native-flora.tk/Kit/Add`, {
        "itemId": itemId,
        "name": name,
        "variants": variants,
        "icon": photos,
        "price": price,
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))

}