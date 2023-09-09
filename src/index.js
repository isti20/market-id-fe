import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import routers from './routers';

import stores from './stores';
import { Provider } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/css/typograph.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={stores}>
      <RouterProvider router={routers} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
