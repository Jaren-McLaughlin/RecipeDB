import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Test connection to backend
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error connecting to backend:', error));
  }, []);
  
  return (
    <div className="App">
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>Welcome to Recipe Management Suite</h2>
        <p>Your personal recipe organization system</p>
        {message && <p>Backend connection: {message}</p>}
      </main>
    </div>
  );
}

export default App;