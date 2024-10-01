import React, {useState} from 'react';
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

const CustomerDashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh", background: "#b7dcfa" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Header />
      </div>
      <div style={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: "#b7dcfa",marginTop: "64px" }}>
        <div style={{ position: "fixed", top: "64px", height: "calc(100vh - 64px)", zIndex: 1000 }}>
          <SideMenu collapsed={collapsed} toggleCollapsed={toggleCollapsed}/>
        </div>
        <div style={{ flex: 1, marginLeft: collapsed? 88 : 263, overflowY: "auto", height: "calc(100vh - 64px)"}}>
          <Routes>
            <Route path="/customer/accounts/fd/new" element={<FixedDepositForm userType="customer"/>}/>
            <Route path="/customer/loan/new" element={<OnlineLoanForm/>}/>
            <Route path="/customer/home" element={<HomePage/>} />
            <Route path="/customers/individual/new" element={<CustomerForm />} />
            <Route path="/customers/business/new" element={<CustomerForm />} />
            <Route path="customer/accounts/view" element={<AccountPageCustomer/>} />
            <Route path="/customer/transaction/new" element={<TransactionForm/>}/>
            <Route path="/customer/loan/view/ongoing" element={<ActiveLoansPage/>} />
            <Route path="/customer/loan/view/pending" element={<PendingLoans/>} />
            <Route path="/customer/transaction/view" element={<TransactionList/>}/>
            <Route path="/customer/change/credentials" element={<InfoUpdate/>}/>
          </Routes>  
        </div> 
      </div>
    </div>
  );
};

export default CustomerDashboard;