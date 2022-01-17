import "styling/base.scss";
import "styling/variables.scss";
import 'i18n/config';
import 'moment/locale/nl-be';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from "react-modal";
import reportWebVitals from './reportWebVitals';

ReactModal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
