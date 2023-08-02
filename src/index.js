// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/SignUp/SignUp';

ReactDOM.render(
  <React.StrictMode>

    <Signup /> {/* Render the Login component */}

  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
