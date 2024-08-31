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
import WithAccountNavigation from '../components/Layout/WithAccountNavigation';
import TransactionReport from '../reports/TransactionReport';
import { CustomerProvider } from '../contexts/CustomerContext';

const EmployeeDashboard = () => {
  return (
    <CustomerProvider>
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", background: "#b7dcfa" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Header />
      </div>
      <div style={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: "#b7dcfa",marginTop: "64px" }}>
        <div style={{ position: "fixed", top: "64px", height: "calc(100vh - 64px)", zIndex: 1000 }}>
          <SideMenu />
        </div>
        <div style={{ flex: 1, marginLeft: "260px", overflowY: "auto", height: "calc(100vh - 64px)"}}>
          <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/management/*" element={<ManagementRoutes />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/search" element={<SearchCustomer />} />
            <Route path='/app/reports/transactions' element={<TransactionReport/>}/>
            <Route path="/customers/*" element={<WithAccountNavigation><CustomerRoutes /></WithAccountNavigation>} />
            <Route path="/app/*" element={<AppRoutes />} />
          </Routes>
        </div>
      </div>
    </div>
    </CustomerProvider>
  );
};

export default EmployeeDashboard;