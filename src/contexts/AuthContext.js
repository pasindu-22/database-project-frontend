// contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    redirectToRoleBasedRoute(userData.role);
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const redirectToRoleBasedRoute = (role) => {
    switch (role) {
      case 'manager':
        navigate('/management');
        break;
      case 'employee':
        navigate('/app');
        break;
      case 'customer':
        navigate('/customers');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);