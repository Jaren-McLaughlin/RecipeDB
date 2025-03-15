import React from 'react';

import { useNavigation } from '../NavigationContext';
import PasswordPolicy from '../components/PasswordPolicy';

export default function Register() {
  const { showPage } = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    showPage('dashboard');
  };

  return (
      <div className="page active"> {/* Add 'active' class here */}
        <div className="auth-form">
        <h2>Create Account 🥄</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-input" placeholder="Username" required />
          <input type="email" className="form-input" placeholder="Email" required />
          <input type="password" className="form-input" placeholder="Password" required />
          <input type="password" className="form-input" placeholder="Confirm Password" required />
          <PasswordPolicy prefix="register-" />
          <button className="btn" type="submit">Register</button>
          <button 
            type="button" 
            className="btn" 
            onClick={(e) => {
              e.preventDefault();
              showPage('login');
            }}
          >
            Return to Login
          </button>
        </form>
      </div>
    </div>
  );
}