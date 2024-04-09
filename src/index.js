import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import AppProviders from './contexts/AppProviders';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
