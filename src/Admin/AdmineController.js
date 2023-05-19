import axios from 'axios'

export const getUnit = (metricValue) => {
  return metricValue === 'Weight' 
          ? 'кг'
            : metricValue === 'Material'
              ? ''
                : 'см'
}

export const checkIsAdmine = (dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'});
  axios.get('https://api.native-flora.tk/Auth/IsAdmin', {
    headers:{'x-access-token': localStorage.getItem('accessToken')}
  })
  .then(() => {
    dispatch({type: 'IS_ADMIN'})
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
  .catch(() => {
    dispatch({type: 'IS_NOT_ADMIN'})
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updateMetric = (id, metricValue, type, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": id,
      "sizes": {
          [type] : metricValue
    }}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updateName = (id, nameValue, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": id,
      "name": nameValue 
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updateDescription = (id, descriptionValue, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": id,
      "description": descriptionValue
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updatePhotos = (id, photos, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": id,
      "icon": photos
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const createVariant = (itemId, Name, Price, Photos, setError, dispatch)=>{
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Variant/Add`, {
      "itemId": itemId,
      "name": Name,
      "price": Price,
      "icon": Photos
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
  .catch(err=>{
    err.response.status === 400 && setError('Такой вариант уже существует!') 
    setTimeout(()=>setError(''), 4000)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const deleteVariant = (itemId, variantId, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Variant/Delete`, {
      "itemId": itemId,
      "variantId": variantId
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updateVariant = (itemId, variantId, name, price, photos, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'});
  axios.post(`https://api.native-flora.tk/Variant/Update`, {
      "itemId": itemId,
      "variantId": variantId,
      "name": name,
      "price": price,
      "icon": photos,
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
    .catch(err=>{
      console.log(err)
      dispatch({type: 'LOADING_IS_COMPLETED'})
    })
}

export const createKit = (itemId, name, variants, photos, price, dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'});
  axios.post(`https://api.native-flora.tk/Kit/Add`, {
      "itemId": itemId,
      "name": name,
      "variants": variants,
      "icon": photos,
      "price": price,
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
    .catch(err=>{
      console.log(err)
      dispatch({type: 'LOADING_IS_COMPLETED'})
    })
}