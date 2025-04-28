import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DateTimePicker from './components/DateTimePicker';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DateTimePicker />
  </React.StrictMode>
);

reportWebVitals();
