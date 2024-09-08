import React from 'react';
import { Routes,Route } from 'react-router-dom';
import LoanApplicationPage from '../components/LoanApplicationPage';
import AllLoanApplicationsPage from '../components/AllLoanApplicationsPage';
import HomePage from '../components/HomePage';
import TransactionForm from '../components/TransactionForm';
// import Home from '../components/Home';

function AppRoutes() {
  return (
    <div>
    <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/loans/individual" element={<LoanApplicationPage/>} />
        <Route path="/loans/business" element={<LoanApplicationPage/>} />
        <Route path="/loans/applications" element={<AllLoanApplicationsPage/>} />
        <Route path="/transactions/new" element={<TransactionForm/>} />
        <Route path="/signout" element={<div>Signout</div>} />
    </Routes>
    </div>
  );
}

export default AppRoutes;