import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance'; // Import the configured Axios instance


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [details, setDetails] = useState(null); // State to store manager details
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // console.log('User:', user);

      let id;
      switch (user.role) {
        case 'manager':
          id = user.Manager_ID;
          break;
        case 'employee':
          id = user.Employee_ID;
          break;
        case 'customer':
          id = user.Customer_ID;
          break;
      }
      fetchDetails(id, user.role); // Fetch details based on role after login
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchDetails = async (id, role) => {
    try {
      let endpoint;
      switch (role) {
        case 'manager':
          endpoint = `https://database-backend-g8-d3f914ee6287.herokuapp.com/api/managers/${id}`;
          break;
        case 'employee':
          endpoint = `https://database-backend-g8-d3f914ee6287.herokuapp.com/api/employees/${id}`;
          break;
        case 'customer':
          endpoint = `https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/${id}`;
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await axiosInstance.get(endpoint);
      setDetails(response.data);
      localStorage.setItem('details', JSON.stringify(response.data)); //
      console.log(`${role} details:`, response.data);
    } catch (error) {
      console.error(`Failed to fetch ${role} details:`, error);
    }
  };

  const login = (userData) => {
    setUser(userData);    // Setuser data
    redirectToRoleBasedRoute(userData.role);
  };

  const logout = () => {
    setUser(null);
    setDetails(null); // Clear manager details on logout
    localStorage.removeItem('details'); // Ensure user is removed from localStorage
    navigate('/customer-login');
  };

  const redirectToRoleBasedRoute = (role) => {
    switch (role) {
      case 'manager':
        navigate('/app/home');
        break;
      case 'employee':
        navigate('/app');
        break;
      case 'customer':
        navigate('/customer/home');
        break;
      default:
        navigate('/role-selection');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, details }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);