import React from 'react';
import { Routes,Route } from 'react-router-dom';
import LoanApplicationPage from '../pages/LoanApplicationPage';
import LoanApplicationForm from '../components/Forms/LoanApplicationForm';
import PendingLoansPage from '../pages/PendingLoansPage';
import HomePage from '../pages/HomePage';
import TransactionForm from '../components/Forms/TransactionForm';
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
        <Route path="/loans/pending" element={<PendingLoansPage/>} />
        <Route path="/transactions/new" element={<TransactionForm/>} />
        <Route path="/signout" element={<div>Signout</div>} />
    </Routes>
    </div>
  );
}

export default AppRoutes;