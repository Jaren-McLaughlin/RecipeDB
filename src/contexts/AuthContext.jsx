// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const storedEmail = localStorage.getItem('userEmail');

      if (!storedEmail) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/user/${storedEmail}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('userEmail');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const userData = await response.json();
        // Set state directly from the response — no checkAuthStatus call
        // to avoid a race with any stale localStorage value
        localStorage.setItem('userEmail', userData.email);
        setUser({ email: userData.email, userName: userData.userName, authenticated: true });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userEmail', data.email);
        setUser({ email: data.email, userName: data.userName, authenticated: true });
        setIsAuthenticated(true);
        return true;
      }

      const errorData = await response.json();
      throw new Error(errorData.msg || 'Registration failed');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('userEmail');
      setUser(null);
      setIsAuthenticated(false);
    }
    return true;
  };

  const verifyAuth = async () => {
    await checkAuthStatus();
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      login,
      logout,
      register,
      checkAuthStatus,
      verifyAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};