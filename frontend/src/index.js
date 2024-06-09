import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './routers/Routers';
import { AuthProvider } from './context/authContext';
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </React.StrictMode>
);