import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = function({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize user from localStorage when component mounts
  useEffect(function() {
    let savedToken = localStorage.getItem('token');
    let savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log('Error parsing saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = function(email, password) {
    return new Promise(function(resolve, reject) {
      setLoading(true);
      authAPI.login({ email: email, password: password }).then(function(response) {
        let newToken = response.data.token;
        let newUser = response.data.user;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        resolve(response.data);
      }).catch(function(error) {
        setLoading(false);
        reject(error);
      });
    });
  };

  // Signup function
  const signup = function(userData) {
    return new Promise(function(resolve, reject) {
      setLoading(true);
      authAPI.signup(userData).then(function(response) {
        let newToken = response.data.token;
        let newUser = response.data.user;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        resolve(response.data);
      }).catch(function(error) {
        setLoading(false);
        reject(error);
      });
    });
  };

  // Logout function
  const logout = function() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  let isAuthenticated = token ? true : false;
  
  // Check if user is admin
  let isAdmin = user && user.role === 'admin' ? true : false;

  let value = {
    user: user,
    token: token,
    loading: loading,
    login: login,
    signup: signup,
    logout: logout,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = function() {
  let context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
