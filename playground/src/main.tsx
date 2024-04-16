import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app.tsx';
import './index.css';
import 'virtual:uno.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
