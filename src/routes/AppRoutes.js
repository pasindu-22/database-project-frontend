import React from 'react';
import { Routes,Route } from 'react-router-dom';
// import Home from '../components/Home';

function AppRoutes() {
  return (
    <div>
    <Routes>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/signout" element={<div>Signout</div>} />
    </Routes>
    </div>
  );
}

export default AppRoutes;