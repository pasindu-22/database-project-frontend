import React from 'react';
import "antd/dist/reset.css";
import './App.css';
import { useAuth } from './contexts/AuthContext';
import EmployeeDashboard from './manager/ManagerDashboard';
import CustomerDashboard from './customer/CustomerDashboard';
import CustomerLogin from './customer/components/CustomerLogin';

function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <CustomerLogin />
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