import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';
import './assets/styles/index.scss';

import { ErrorsProvider } from '@contexts/requestsAndServerError';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found in index.html');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <ErrorsProvider>
      <App />
    </ErrorsProvider>
  </BrowserRouter>,
);
