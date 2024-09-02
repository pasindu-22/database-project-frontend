import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from '../components/Layout/CustomerSideMenu';
import CustomerForm from '../components/Forms/CustomerForm';
import Header from '../components/Layout/Header';
import OnlineLoanForm from '../components/Forms/OnlineLoanForm';
import FixedDepositForm from '../components/Forms/FDForm';
import TransactionForm from '../components/Forms/TransactionForm';
import AccountPageCustomer from './AccountPage-customer';
import ActiveLoansPage from './ActiveLoansPage';
import TransactionList from '../components/Lists/TransactionsList';

const CustomerDashboard = () => {
  return (
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
          <Route path="/customer/accounts/fd/new" element={<FixedDepositForm/>}/>
          <Route path="/customer/loan/new" element={<OnlineLoanForm/>}/>
          <Route path="/customer/dashboard" element={<div> Welcome User</div>} />
          <Route path="/customers/individual/new" element={<CustomerForm />} />
          <Route path="/customers/business/new" element={<CustomerForm />} />
          <Route path="customer/accounts/view" element={<AccountPageCustomer/>} />
          <Route path="/customer/transaction/new" element={<TransactionForm/>}/>
          <Route path="/customer/loan/view/ongoing" element={<ActiveLoansPage/>} />
          <Route path="/customer/transaction/view" element={<TransactionList/>}/>
        </Routes> 
      </div> 
    </div>
  </div>
  );
};

export default CustomerDashboard;