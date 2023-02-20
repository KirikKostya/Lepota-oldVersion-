import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allContextParametrs = {
    isAuthorizate: localStorage.getItem('accessToken')
}

const reducer = (state = allContextParametrs, action) => {
    switch(action.type){
      case 'COMPLETED_AUTHORIZATION':
        return {...state, isAuthorizate: true};
      case 'UNCOMPLETED_AUTHORIZATION': 
        return {...state, isAuthorizate: false};
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
