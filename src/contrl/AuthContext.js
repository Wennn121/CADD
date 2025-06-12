import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('token', 'loggedIn');
    } else {
      localStorage.removeItem('token');
    }
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};