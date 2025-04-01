import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './App.css';

//Pages Imports
import PageContainer from './components/layout/PageContainer';
import DashboardPage from './pages/DashboardPage';
import RecipePage from './pages/RecipePage';
import ApiTestPage from './pages/ApiTestPage';
import EditRecipePage from './pages/EditRecipePage';
import SignInPage from './pages/SignupPage';

import { ThemeProvider } from './contexts/ThemeProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CssBaseline normalizes styles and applies theme background */}
        <Router>
          <div className="App">
            <PageContainer>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/api" element={<ApiTestPage />} />
                {/* You can add more routes here as your app grows */}
                <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
                <Route path="/signup" element={<SignInPage />} />
              </Routes>
            </PageContainer>
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
