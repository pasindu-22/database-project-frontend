import React from 'react';
import "antd/dist/reset.css";
import './App.css';
import { useAuth } from './contexts/AuthContext';
import ManagerDashboard from './manager/ManagerDashboard';
import CustomerDashboard from './customer/CustomerDashboard';
import CustomerLogin from './customer/components/CustomerLogin';
import EmployeeDashboard from './employee/EmployeeDashboard';


function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <CustomerLogin />
      ) : user.role === 'manager' ? (
        <ManagerDashboard />
      ) : user.role === 'employee' ? (
        <EmployeeDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
}

export default App;