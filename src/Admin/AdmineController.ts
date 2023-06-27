import { loadingComplate, loadingUncomplate, isAdmine, isNotAdmine} from '../ReduxToolkit/Slices';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getUnit = (metricValue: string) => {
  return metricValue === 'Weight' 
          ? 'кг'
            : metricValue === 'Material'
              ? ''
                : 'см'
}

export const checkIsAdmine = async (dispatch: Dispatch) => {
    await axios.get('https://api.native-flora.tk/Auth/IsAdmin', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
      .then((res) => res.data.data === true ? dispatch(isAdmine()) : dispatch(isNotAdmine()))
      .catch(() => dispatch(isNotAdmine()));
}

export const updateMetric = (id: string, metricValue: string, type: string, dispatch: Dispatch) => {
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
      "sizes": {
          [type] : metricValue
    }}, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch(loadingComplate())
  })
  .catch(err=>{
    dispatch(loadingComplate())
  })
}

export const updateName = (id: string, nameValue: string, price:string, dispatch: Dispatch) => {
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
      "name": nameValue,
      "price": price
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch(loadingComplate())
  })
  .catch(err=>{
    dispatch(loadingComplate())
  })
}

export const updateDescription = (id: string, descriptionValue: string, dispatch: Dispatch) => {
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
      "description": descriptionValue
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch(loadingComplate())
  })
  .catch(err=>{
    dispatch(loadingComplate())
  })
}

export const updatePhotos = (id: string, photos: string[], dispatch: Dispatch) => {
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Item/Update`, {
      "id": +id,
      "icon": photos
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(res=>{
    localStorage.setItem('infoAboutTypeOfOrder', JSON.stringify(res.data.data))
    dispatch(loadingComplate())
  })
  .catch(err=>{
    dispatch(loadingComplate())
  })
}

export const createVariant = (itemId: string, Name: string, Price: string, Photos: string[], setError:(str: string)=>void, dispatch:Dispatch)=>{
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Variant/Add`, {
      "itemId": +itemId,
      "name": Name,
      "price": +Price,
      "icon": Photos
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(()=>dispatch(loadingComplate()))
  .catch(err=>{
    err.response.status === 400 && setError('Такой вариант уже существует!') 
    setTimeout(()=>setError(''), 4000)
    dispatch(loadingComplate())
  })
}

export const deleteVariant = (itemId:string, variantId:string, dispatch:Dispatch) => {
  dispatch(loadingUncomplate())
  axios.post(`https://api.native-flora.tk/Variant/Delete`, {
      "itemId": +itemId,
      "variantId": +variantId
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
  .then(()=>dispatch(loadingComplate()))
  .catch(err=>{
    dispatch(loadingComplate())
  })
}

export const updateVariant = (itemId: string, variantId:string, name:string, price:string, photos:string[], dispatch:Dispatch) => {
  dispatch(loadingUncomplate());
  axios.post(`https://api.native-flora.tk/Variant/Update`, {
      "itemId": +itemId,
      "variantId": +variantId,
      "name": name,
      "price": +price,
      "icon": photos,
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>dispatch(loadingComplate()))
    .catch(err=>{
      dispatch(loadingComplate())
    })
}

export const createKit = (itemId: number, name:string, variants:number[], photos:string[], price:string, dispatch:Dispatch) => {
  dispatch(loadingUncomplate());
  axios.post(`https://api.native-flora.tk/Kit/Add`, {
      "itemId": +itemId,
      "name": name,
      "variants": variants,
      "icon": photos,
      "price": +price,
    }, {
      headers:{'x-access-token': localStorage.getItem('accessToken')}     
    })
    .then(()=>dispatch(loadingComplate()))
    .catch(err=>{
      dispatch(loadingComplate())
    })
}