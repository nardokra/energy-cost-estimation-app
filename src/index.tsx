// Priority imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Styling
import './styles/globals.css';

// Components
import App from './App';
import { StyledEngineProvider } from '@mui/material';

// Utils
import reportWebVitals from './utils/performanceMeasuring/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
