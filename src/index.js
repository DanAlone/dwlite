import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './dwlite.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'core-js/stable';

import Login from './Login.js';
import Main from './Main.js';

const root = createRoot(document.getElementById("root"));

root.render (
  //<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" default exact element={<App />} />
      <Route path="/home" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  //</React.StrictMode>,
  //document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
