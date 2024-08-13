import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

function AccountRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<div>Accounts</div>} />
      
  </Routes>
  );
}

export default AccountRoutes;