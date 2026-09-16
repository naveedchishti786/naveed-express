import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
