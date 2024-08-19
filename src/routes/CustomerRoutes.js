import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileRoutes from './ProfileRoutes';
import AccountRoutes from './AccountRoutes';

function CustomerRoutes() {
  return (
    <>
      <Routes>
        <Route path=":customerId/accounts/*" element={<AccountRoutes />} />
        <Route path=":customerId/profile/*" element={<ProfileRoutes />} />
      </Routes>
    </>
  );
}

export default CustomerRoutes;