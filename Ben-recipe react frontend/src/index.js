import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { NavigationProvider } from './NavigationContext';
import React from 'react';

const root = createRoot(document.getElementById('root'));

// Create the navigation handler function
const navigationValue = {
  showPage: (page) => {
    // This will be implemented in App.js state
    console.log('Navigating to:', page);
  }
};

root.render(
  <NavigationProvider value={navigationValue}>
    <App />
  </NavigationProvider>
);