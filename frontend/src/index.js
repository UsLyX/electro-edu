import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './routers/Routers';
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>
);