import { useNavigation } from '../NavigationContext';
import React from 'react';

export default function Login() {
  const { showPage } = useNavigation();

  return (
    <div className="page active">
      <div className="auth-form">
        <h2>Welcome to RecipeMaster 👩🍳</h2>
        <input type="text" className="form-input" placeholder="Username" />
        <input type="password" className="form-input" placeholder="Password" />
        <button className="btn" onClick={() => showPage('dashboard')}>Login</button>
        <p style={{ marginTop: '1rem' }}>
          New user? <button className="btn btn-success" id="register-registerBtn" type="submit"  onClick={() => showPage('register')}>
            <i className="fas fa-user-plus"></i>Create account
            </button>
        </p>
      </div>
    </div>
  );
}