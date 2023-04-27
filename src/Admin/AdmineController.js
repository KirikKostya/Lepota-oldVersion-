import axios from 'axios'

export const checkIsAdmine = (dispatch) => {
    axios.get('https://api.native-flora.tk/Auth/IsAdmin', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(() => dispatch({type: 'IS_ADMIN'}))
    .catch(() => dispatch({type: 'IS_NOT_ADMIN'}))
  }

export const updateMetric = (id, metricValue, type) => {
  // console.log(type.replace('metric ', ''), metricValue)
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "sizes": {
            [type.replace('metric ', '')] : metricValue
        },
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

export const updateName = (id, nameValue) => {
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "name": nameValue 
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}

export const updateDescription = (id, descriptionValue) => {
  console.log(descriptionValue)
  axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "description": descriptionValue.split('.')
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}