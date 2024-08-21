import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from '../components/Layout/CustomerSideMenu';
import CustomerRoutes from '../routes/CustomerRoutes';
import CustomerForm from '../components/Forms/CustomerForm';
import { Footer, Header } from 'antd/es/layout/layout';

const CustomerDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", background: "#b7dcfa" }}>
      <Header/>
    <div style={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: "#b7dcfa" }}>
      <SideMenu /> {/* Add Sidebar */}
      <div style={{ flex: 1 }}>
        <h1>Customer Dashboard</h1>
        <Routes>
          <Route path="/" element={<CustomerRoutes />} />
          <Route path="/customers/individual/new" element={<CustomerForm />} />
          <Route path="/customers/business/new" element={<CustomerForm />} />
          
        </Routes>
      </div>
    </div>
    <Footer/>
  </div>
  );
};

export default CustomerDashboard;