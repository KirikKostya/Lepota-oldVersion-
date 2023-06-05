import axios from 'axios'
import { Dispatch } from 'redux';

export const getUnit = (metricValue: string) => {
  return metricValue === 'Weight' 
          ? 'кг'
            : metricValue === 'Material'
              ? ''
                : 'см'
}

export const checkIsAdmine = (dispatch: Dispatch) => {
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

export const updateMetric = (id: string, metricValue: string, type: string, dispatch: Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
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

export const updateName = (id: string, nameValue: string, dispatch: Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
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

export const updateDescription = (id: string, descriptionValue: string, dispatch: Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
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

export const updatePhotos = (id: string, photos: string[], dispatch: Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
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

export const createVariant = (itemId: string, Name: string, Price: string, Photos: string[], setError:(str: string)=>void, dispatch:Dispatch)=>{
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Variant/Add`, {
      "itemId": +itemId,
      "name": Name,
      "price": +Price,
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

export const deleteVariant = (itemId:string, variantId:string, dispatch:Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'})
  axios.post(`https://api.native-flora.tk/Variant/Delete`, {
      "itemId": +itemId,
      "variantId": +variantId
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
  .catch(err=>{
    console.log(err)
    dispatch({type: 'LOADING_IS_COMPLETED'})
  })
}

export const updateVariant = (itemId: string, variantId:string, name:string, price:string, photos:string[], dispatch:Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'});
  axios.post(`https://api.native-flora.tk/Variant/Update`, {
      "itemId": +itemId,
      "variantId": +variantId,
      "name": name,
      "price": +price,
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

export const createKit = (itemId: number, name:string, variants:number[], photos:string[], price:string, dispatch:Dispatch) => {
  dispatch({type: 'LOADING_IS_UNCOMPLETED'});
  axios.post(`https://api.native-flora.tk/Kit/Add`, {
      "itemId": +itemId,
      "name": name,
      "variants": variants,
      "icon": photos,
      "price": +price,
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>dispatch({type: 'LOADING_IS_COMPLETED'}))
    .catch(err=>{
      console.log(err)
      dispatch({type: 'LOADING_IS_COMPLETED'})
    })
}