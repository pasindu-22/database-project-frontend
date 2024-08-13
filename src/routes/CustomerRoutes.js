import React from 'react';
import { Routes,Route } from 'react-router-dom';
import CustomerNavigation from '../components/Layout/CustomerNavigation';
import ProfileRoutes from './ProfileRoutes';
import AccountRoutes from './AccountRoutes';

function CustomerRoutes() {
  return (
    <>
      <Routes>
        <Route path="/existing/individual" element={<CustomerNavigation />} />
        <Route path="/existing/business" element={<CustomerNavigation />} />
        <Route path="/profile/*" element={<ProfileRoutes />} />
        <Route path="/accounts/*" element={<AccountRoutes />} />
        <Route path="/logs/*" element={<AccountRoutes />} />
      
      </Routes>
  </>
  );
}

export default CustomerRoutes;