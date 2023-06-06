import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './MainFiles/App';
import store from './ReduxToolkit/Store';
import reportWebVitals from './Others/reportWebVitals';
import './MainFiles/Styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode> 
)

reportWebVitals();
