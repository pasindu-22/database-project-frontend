import React, { useState, useEffect } from 'react';
import "antd/dist/reset.css";
import './App.css';
import { CustomerProvider } from './contexts/CustomerContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RoleSelection from './components/Forms/RoleSelection';
import EmployeeDashboard from './pages/EmployeeDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <RoleSelection />
      ) : (
        user.role === 'employee' || user.role === 'manager' ? (
          <EmployeeDashboard />
        ) : (
          <CustomerDashboard />
        )
      )}
    </>
  );
}

export default App;