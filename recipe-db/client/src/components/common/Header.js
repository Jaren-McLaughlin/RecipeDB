// client/src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={{ 
      background: '#f4f4f4', 
      padding: '1rem', 
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1>Recipe Management Suite</h1>
      <nav>
        <ul style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          listStyle: 'none', 
          gap: '1rem' 
        }}>
          <li><a href="/">Home</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;