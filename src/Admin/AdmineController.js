import axios from 'axios'

export const checkIsAdmine = (dispatch) => {
    axios.get('https://api.native-flora.tk/Auth/IsAdmin', {
      headers:{'x-access-token': localStorage.getItem('accessToken')}
    })
    .then(() => dispatch({type: 'IS_ADMIN'}))
    .catch(() => dispatch({type: 'IS_NOT_ADMIN'}))
  }

export const updateMetric = (id, nameOfMetric, value) => {
    // console.log(id)
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "sizes": {
            "1": value
        },
        "id": id
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
}

export const updateName = (id, name) => {
    axios.post(`https://api.native-flora.tk/Item/Update`, {
        "id": id,
        "name": name 
      }, {
        headers:{'x-access-token': localStorage.getItem('accessToken')}     
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
}