import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

function ProfileRoutes() {
  return (
  <Routes>
      <Route path="/details" element={<ProfilePage />} />
      
  </Routes>
  );
}

export default ProfileRoutes;