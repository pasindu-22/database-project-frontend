// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    redirectToRoleBasedRoute(userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Ensure user is removed from localStorage
    navigate('/role-selection');
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
        navigate('/role-selection');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);