import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ManagerList from '../components/Lists/ManagerList';
import CustomerForm from '../components/Forms/CustomerForm';

function CustomerRoutes() {
  return (
  <Routes>
      <Route path="/new" element={<CustomerForm />} />
      <Route path="/existing" element={<ManagerList />} />
      <Route path="/bussiness/new" element={<ManagerList />} />
      <Route path="/bussiness/existing" element={<ManagerList />} />
      
  </Routes>
  );
}

export default CustomerRoutes;