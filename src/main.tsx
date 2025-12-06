import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './styles/variables.css';
import './index.css';
import './layouts/BaseLayout.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
