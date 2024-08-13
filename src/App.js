import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
import "antd/dist/reset.css";
import './App.css';
import { CustomerProvider } from './contexts/CustomerContext';
import { AuthProvider } from './contexts/AuthContext';
import RoleSelection from './components/Forms/RoleSelection';
import EmployeeDashboard from './pages/EmployeeDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('role', selectedRole);
  };

  const handleSignOut = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  if (!role) {
    return <RoleSelection onRoleSelect={handleRoleSelection} />;
  }

  return (
    <AuthProvider>
      <CustomerProvider>
        {role === 'employee' || role === 'manager' ? (
          <EmployeeDashboard />
        ) : (
          <CustomerDashboard />
        )}
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;