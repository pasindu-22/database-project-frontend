import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Layout/Header';
import SideMenu from '../components/Layout/SideMenu';
import Footer from '../components/Layout/Footer';
import AuthRoutes from '../routes/AuthRoutes';
import ManagementRoutes from '../routes/ManagementRoutes';
import AppRoutes from '../routes/AppRoutes';
import CustomerRoutes from '../routes/CustomerRoutes';
import CustomerForm from '../components/Forms/CustomerForm';
import SearchCustomer from '../components/Forms/SearchCustomer';
import WithCustomerNavigation from '../components/Layout/WithCustomerNavigation';

const EmployeeDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", background: "#b7dcfa" }}>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: "#b7dcfa" }}>
        <SideMenu />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/management/*" element={<ManagementRoutes />} />
            <Route path="/customers/individual/new" element={<CustomerForm />} />
            <Route path="/customers/business/new" element={<CustomerForm />} />
            <Route path="/customers/search" element={<SearchCustomer />} />
            <Route path="/customers/*" element={<WithCustomerNavigation><CustomerRoutes /></WithCustomerNavigation>} />
            <Route path="/app/*" element={<AppRoutes />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;