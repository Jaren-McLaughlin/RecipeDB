import React from 'react';

import { useNavigation } from '../NavigationContext';
import PasswordPolicy from '../components/PasswordPolicy';

export default function Profile() {
  const { showPage } = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    showPage('dashboard');
  };

  return (
    <div className="page active"> {/* Add 'active' class here */}
      <div className="auth-form">
        <h2>Edit Profile 👤</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-input" defaultValue="ChefJohn" />
          <input type="email" className="form-input" defaultValue="john@recipe.com" />
          <input type="password" className="form-input" placeholder="New Password" />
          <input type="password" className="form-input" placeholder="Confirm New Password" />
          <PasswordPolicy prefix="profile-" />
          <button className="btn" type="submit">Save Changes</button>
          <button type="button" className="btn" onClick={() => showPage('dashboard')}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}