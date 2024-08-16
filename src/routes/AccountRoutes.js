import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AccountPage from '../pages/AccountPage';

function AccountRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<AccountPage/>} />
      
  </Routes>
  );
}

export default AccountRoutes;