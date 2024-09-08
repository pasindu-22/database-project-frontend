import React from 'react';
import "antd/dist/reset.css";
import './App.css';
import { useAuth } from './contexts/AuthContext';
import RoleSelection from './components/Forms/RoleSelection';
import EmployeeDashboard from './manager/ManagerDashboard';
import CustomerDashboard from './customer/CustomerDashboard';

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