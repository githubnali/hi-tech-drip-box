import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import '@/styles/globals.css';
import { App } from '@/app/App';
import { ScrollToTop } from '@/app/ScrollToTop';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 6000,
            className: 'font-sans',
            style: {
              background: '#0B351C',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '0.9rem',
              maxWidth: '520px',
            },
            ariaProps: { role: 'status', 'aria-live': 'polite' },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
