// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login/Login'; // Import the Login component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

    <Login /> {/* Render the Login component */}

  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
