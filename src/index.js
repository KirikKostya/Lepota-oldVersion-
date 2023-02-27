import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allContextParametrs = {
    isAuthorizate: localStorage.getItem('accessToken'),
    isLoading: true,
    typeOfDelivery: 'pickUp',
    myAccountIsOpen: false
}

const reducer = (state = allContextParametrs, action) => {
    switch(action.type){
      case 'COMPLETED_AUTHORIZATION':
        return {...state, isAuthorizate: true};
      case 'UNCOMPLETED_AUTHORIZATION': 
        return {...state, isAuthorizate: false};
      case 'LOADING_IS_COMPLETED':
        return {...state, isLoading: false};
      case 'LOADING_IS_UNCOMPLETED': 
        return {...state, isLoading: true}; // delete (if didn't used)
      case 'SET_TYPE_OF_DELIVERY_TO_PICK_UP':
        return {...state, typeOfDelivery: 'pickUp'};
      case 'SET_TYPE_OF_DELIVERY_TO_DELIVERY':
        return {...state, typeOfDelivery: 'delivery'};
      case 'OPEN_MY_ACCOUNT':
        return {...state, myAccountIsOpen: true};
      case 'CLOSE_MY_ACCOUNT':
        return {...state, myAccountIsOpen: false};
      default : 
        return {...state}
      }
  }

const store = createStore(reducer)

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);

reportWebVitals();
