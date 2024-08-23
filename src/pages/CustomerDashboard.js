import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from '../components/Layout/CustomerSideMenu';
import CustomerRoutes from '../routes/CustomerRoutes';
import CustomerForm from '../components/Forms/CustomerForm';
import { Footer, Header } from 'antd/es/layout/layout';
import LoanApplicationForm from '../components/Forms/LoanApplicationForm';
import FixedDepositForm from '../components/Forms/FDForm';
import TransactionForm from '../components/Forms/TransactionForm';

const CustomerDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", background: "#b7dcfa" }}>
      <Header/>
      <div style={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: "#b7dcfa" }}>
      <SideMenu /> {/* Add Sidebar */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/customer/accounts/fd/new" element={<FixedDepositForm/>}/>
          <Route path="/customer/loan/new" element={<LoanApplicationForm/>}/>
          <Route path="/customer/dashboard" element={<div> Welcome User</div>} />
          <Route path="/customers/individual/new" element={<CustomerForm />} />
          <Route path="/customers/business/new" element={<CustomerForm />} />
          <Route path="/customer/transaction/new" element={<TransactionForm/>}/>
        </Routes> 
      </div>
    </div>
    <Footer/>
  </div>
  );
};

export default CustomerDashboard;