import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import { ToastContainer, Flip } from 'react-toastify';
import channelTalk from './components/channelTalk';

import 'react-toastify/dist/ReactToastify.css';
import './style/init.css'
import './style/var.css'
import "./lang/i18n";

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'

import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_REACT_GA);
ReactGA.pageview(window.location.pathname + window.location.search);

channelTalk.boot({
  "pluginKey": "7749bc67-021a-45c9-a614-2f3c8f22949a"
});

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
