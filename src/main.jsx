import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItemProvider } from './context/ItemContext';
import './styles.css'; // Optional
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
  </React.StrictMode>
);
