import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Layout/SideMenu';
import CustomerRoutes from '../routes/CustomerRoutes';
import CustomerForm from '../components/Forms/CustomerForm';
import SearchCustomer from '../components/Forms/SearchCustomer';
import WithCustomerNavigation from '../components/Layout/WithCustomerNavigation';

const CustomerDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Add Sidebar */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Customer Dashboard</h1>
        <Routes>
          <Route path="/customers/individual/new" element={<CustomerForm />} />
          <Route path="/customers/business/new" element={<CustomerForm />} />
          <Route path="/customers/search" element={<SearchCustomer />} />
          <Route path="/customers/*" element={<WithCustomerNavigation><CustomerRoutes /></WithCustomerNavigation>} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;