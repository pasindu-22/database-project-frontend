import React from 'react';
import { Routes,Route } from 'react-router-dom';

function AccountRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<div>Accounts</div>} />
      
  </Routes>
  );
}

export default AccountRoutes;