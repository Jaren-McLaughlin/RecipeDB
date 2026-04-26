import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with values from localStorage (if any)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mockAuthState') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mockUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('mockAuthState', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('mockUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('mockUser');
    }
  }, [isAuthenticated, user]);

  // Mock login function - always succeeds
  const login = async (credentials) => {
    console.log('Mock login with:', credentials);
    
    // Create mock user with provided email or default
    const mockUser = {
      userId: 1,
      userName: credentials.email?.split('@')[0] || 'TestUser',
      email: credentials.email || 'test@example.com'
    };
    
    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);
    
    return true; // Always succeed
  };

  // Mock logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      // Add indicator that this is mock
      isMockAuth: true
    }}>
      {children}
    </AuthContext.Provider>
  );
};