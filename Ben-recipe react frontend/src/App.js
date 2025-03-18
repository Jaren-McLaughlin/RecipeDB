import React from 'react';


import { useState } from 'react';
import { NavigationProvider } from './NavigationContext';
import Navbar from './components/Navbar';
import ShareModal from './components/ShareModal';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SharedRecipes from './pages/SharedRecipes';
import AddEditRecipe from './pages/AddEditRecipe';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.history.replaceState(null, '', `/${page}`);
  };

  return (
    <NavigationProvider value={{ showPage: handleNavigation }}>
      <div className="App">
        {currentPage !== 'login' && <Navbar />}
        <ShareModal
          visible={showShareModal}
          onClose={() => setShowShareModal(false)}
        />
        
        {currentPage === 'login' && <Login />}
        {currentPage === 'register' && <Register />}
        {currentPage === 'dashboard' && <Dashboard showShareModal={() => setShowShareModal(true)} />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'shared' && <SharedRecipes />}
        {currentPage === 'add-recipe' && <AddEditRecipe />}
        {currentPage === 'edit-recipe' && <AddEditRecipe />}
      </div>
    </NavigationProvider>
  );
}