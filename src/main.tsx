import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/primereact.min.css';

import './styles/variables.css';
import './index.css';
import './layouts/BaseLayout.css';

import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
// import "primereact/resources/themes/lara-light-blue/theme.css";

// Ensure sensitive auth state (token/user) is not persisted in localStorage
if (typeof window !== 'undefined') {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('persist:root');
}






import { Toaster } from 'sonner';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors closeButton />
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
