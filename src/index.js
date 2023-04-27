import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './MailFiles/Styles/index.css';
import App from './MailFiles/App';
import reportWebVitals from './Others/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allContextParametrs = {
    isAuthorizate: Boolean(localStorage.getItem('accessToken')),
    isAdmin: false,
    isLoading: true,
    myAccountIsOpen: false,
    countOfOrders: 0,
    searchOrderById: 0,
    refreshTokenIsExpired: false,
    totalSum_TypeComp: 0,
    isLoadingInArchive: false
}

const reducer = (state = allContextParametrs, action) => {
    switch(action.type){
      case 'COMPLETED_AUTHORIZATION':
        return {...state, isAuthorizate: true};
      case 'UNCOMPLETED_AUTHORIZATION': 
        return {...state, isAuthorizate: false};
      case 'IS_ADMIN':
        return {...state, isAdmin: true};
      case 'IS_NOT_ADMIN': 
        return {...state, isAdmin: false};
      case 'LOADING_IS_COMPLETED':
        return {...state, isLoading: false};
      case 'LOADING_IS_UNCOMPLETED': 
        return {...state, isLoading: true}; // delete (if didn't used)
      case 'OPEN_MY_ACCOUNT':
        return {...state, myAccountIsOpen: true};
      case 'CLOSE_MY_ACCOUNT':
        return {...state, myAccountIsOpen: false};
      case 'SET_COUNT_OF_ORDERS':
        return {...state, countOfOrders: action.payload};
      case 'SET_SEARCH_ORDER-ID':
        return {...state, searchOrderById: action.payload}
      case 'SET_REFRESH-TOKEN_STATUS':
        return {...state, refreshTokenIsExpired: action.payload}


      case 'SET_TOTAL_SUM_TYPE-COMP':
        return {...state, totalSum_TypeComp: action.payload}
      case 'INCREMENT_TOTAL_SUM_TYPE-COMP':
        return {...state, totalSum_TypeComp: state.totalSum_TypeComp + action.payload}
      case 'DECREMENT_TOTAL_SUM_TYPE-COMP':
        return {...state, totalSum_TypeComp: state.totalSum_TypeComp - action.payload}
      case 'LOADING-Archive_IS_COMPLETED':
        return {...state, isLoadingInArchive: false};
      case 'LOADING-Archive_IS_UNCOMPLETED': 
        return {...state, isLoadingInArchive: true};
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
