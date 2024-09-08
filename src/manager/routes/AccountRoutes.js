import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AccountPageManager from '../components/AccountsPage';
import SavingsAccountForm from '../../components/Forms/SavingsAccountForm';
import FDForm from '../../components/Forms/FDForm';

function AccountRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<AccountPageManager/>} />
      <Route path="/new" element={<SavingsAccountForm/>}/>
      <Route path="/fd/new" element={<FDForm userType="employee"/>}/>
      
  </Routes>
  );
}

export default AccountRoutes;