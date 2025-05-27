import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';

// Firebase configuration - uses environment variables if available, otherwise defaults to empty
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'not-configured',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'not-configured',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'not-configured',
  projectId: process.env.FIREBASE_PROJECT_ID || 'not-configured',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'not-configured',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'not-configured',
};

// Only log Firebase config in development and if actually configured
if (process.env.NODE_ENV === 'development' && process.env.FIREBASE_PROJECT_ID) {
  console.table(firebaseConfig);
} else {
  console.log('Running without Firebase authentication - game features available');
}

const container = document.getElementById('app-mount');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App firebaseConfig={firebaseConfig}/>
  </Provider>,
);
