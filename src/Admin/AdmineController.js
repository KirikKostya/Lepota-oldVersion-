import axios from 'axios'

const getUnit = (metricValue) => {
  return metricValue === 'Weight' 
          ? 'кг'
            : metricValue === 'Material'
              ? ''
                : 'см'
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