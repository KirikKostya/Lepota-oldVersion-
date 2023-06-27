import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './Others/reportWebVitals';
import store from './ReduxToolkit/Store';
import App from './MainFiles/App';
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
