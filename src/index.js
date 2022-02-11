import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import { ToastContainer, Flip } from 'react-toastify';
// import GlobalStyle from './style/var';
import 'react-toastify/dist/ReactToastify.css';
import './style/init.css'
import './style/var.css'
import "./lang/i18n";

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'


ReactDOM.render(
  <React.StrictMode>
    {/* <GlobalStyle /> */}
    <Router />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      transition={ Flip }
      />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
