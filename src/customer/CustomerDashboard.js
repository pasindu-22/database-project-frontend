import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from './components/CustomerSideMenu';
import CustomerForm from '../components/Forms/CustomerForm';
import Header from '../components/Layout/Header';
import OnlineLoanForm from '../components/Forms/OnlineLoanForm';
import FixedDepositForm from '../components/Forms/FDForm';
import TransactionForm from './components/TransactionForm';
import AccountPageCustomer from './components/AccountsPage';
import ActiveLoansPage from './components/ActiveLoansPage';
import TransactionList from '../components/Lists/TransactionsList';
import InfoUpdate from './components/InfoUpdate';
import HomePage from './components/HomePage';
import PendingLoans from './components/PendingLoans';
import './CustomerDashboard.css'; // Import the stylesheet

const CustomerDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Header />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <SideMenu collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </div>
        <div className="dashboard-main" style={{ marginLeft: collapsed ? 88 : 263 }}>
          <Routes>
            <Route path="/customer/accounts/fd/new" element={<FixedDepositForm userType="customer" />} />
            <Route path="/customer/loan/new" element={<OnlineLoanForm />} />
            <Route path="/customer/home" element={<HomePage />} />
            <Route path="/customers/individual/new" element={<CustomerForm />} />
            <Route path="/customers/business/new" element={<CustomerForm />} />
            <Route path="customer/accounts/view" element={<AccountPageCustomer />} />
            <Route path="/customer/transaction/new" element={<TransactionForm />} />
            <Route path="/customer/loan/view/ongoing" element={<ActiveLoansPage />} />
            <Route path="/customer/loan/view/pending" element={<PendingLoans />} />
            <Route path="/customer/transaction/view" element={<TransactionList />} />
            <Route path="/customer/change/credentials" element={<InfoUpdate />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;