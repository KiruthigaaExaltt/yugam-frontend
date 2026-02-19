import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/primereact.min.css';

import './styles/variables.css';
import './index.css';
import './layouts/BaseLayout.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import "primereact/resources/themes/lara-light-blue/theme.css";


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((reg) => {
        console.log('🔥 Service Worker registered:', reg);
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}

import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <BrowserRouter>
            <Toaster position="top-right" richColors />
            <App />
          </BrowserRouter>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
