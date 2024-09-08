import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ProfilePage from '../components/CustomerProfilePage';

function ProfileRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<ProfilePage />} />
      
  </Routes>
  );
}

export default ProfileRoutes;