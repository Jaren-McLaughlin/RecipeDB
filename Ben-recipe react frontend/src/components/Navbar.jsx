import { useState } from 'react';
import React from 'react';
import { useNavigation } from '../NavigationContext';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { showPage } = useNavigation();

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => showPage('dashboard')}>RecipeMaster</div>
      <button className="menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
        <a className="dropdown-item" onClick={() => showPage('profile')}>
          <i className="fas fa-user-cog"></i>Edit Profile
        </a>
        <a className="dropdown-item" onClick={() => showPage('shared')}>
          <i className="fas fa-share-alt"></i>Shared Recipes
        </a>
        <a className="dropdown-item" onClick={() => showPage('login')}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </a>
      </div>
    </nav>
  );
}