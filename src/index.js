import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'; // Importujemy BrowserRouter

import App from './components/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
 
      <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

