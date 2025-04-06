import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './App.css';
import ProtectedRoute from './components/ProtectedRoutes';
// import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider } from './contexts/MockAuthContext';
//Pages Imports
import PageContainer from './components/layout/PageContainer';
import DashboardPage from './pages/DashboardPage';
import RecipePage from './pages/RecipePage';
import ApiTestPage from './pages/ApiTestPage';
import EditRecipePage from './pages/EditRecipePage';
import SignInPage from './pages/SigninPage';
import SignUpPage from './pages/SignUpPage';
import AddRecipePage from './pages/AddRecipePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';

import { ThemeProvider } from './contexts/ThemeProvider';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline normalizes styles and applies theme background */}
          <Router>
            <div className="App">
              <PageContainer>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/" element={<LandingPage/>} />

                  {/* Protected routes - only accessible when logged in */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/recipe/:id" element={<RecipePage />} />
                    <Route path="/api" element={<ApiTestPage />} />
                    <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
                    <Route path="/add" element={<AddRecipePage />} />
                    <Route path="/add" element={<AddRecipePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/dash" element={<DashboardPage />} />
                    </Route>
                </Routes>
              </PageContainer>
            </div>
          </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
