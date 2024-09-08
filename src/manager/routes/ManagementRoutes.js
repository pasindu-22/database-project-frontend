import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AdminForm from '../../components/Forms/AdminForm';
import BranchForm from '../../components/Forms/BranchForm';
import ManagerList from '../../components/Lists/ManagerList';
import BranchList from '../../components/Lists/BranchList';

function ManagementRoutes() {
  return (
  <Routes>
      <Route path="/new/manager" element={<AdminForm />} />
      <Route path="/new/branch" element={<BranchForm />} />
      <Route path="/managers" element={<ManagerList />} />
      <Route path="/branches" element={<BranchList />} />
  </Routes>
  );
}

export default ManagementRoutes;