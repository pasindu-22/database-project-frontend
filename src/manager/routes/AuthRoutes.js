import React from 'react';
import { Routes,Route } from 'react-router-dom';
import LoginForm from '../../components/Forms/LoginForm';

function AuthRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default AuthRoutes;