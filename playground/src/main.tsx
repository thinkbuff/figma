import React from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipProvider } from '@thinkbuff/figma-react/tooltip';

import { App } from './app';
import './index.css';
import 'virtual:uno.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <TooltipProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TooltipProvider>,
);
