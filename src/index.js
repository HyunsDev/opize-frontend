import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import './assets/init.css'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'


ReactDOM.render(
  <React.StrictMode>
    <Router />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
