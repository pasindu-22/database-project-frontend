import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Layout/Header';
import SideMenu from './components/ManagerSideMenu';
import AuthRoutes from './routes/AuthRoutes';
import ManagementRoutes from './routes/ManagementRoutes';
import AppRoutes from './routes/AppRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import CustomerForm from '../components/Forms/PersonalCustomerForm';
import BusinessCustomerForm from '../components/Forms/BusinessCustomerForm';
import SearchCustomer from '../components/Forms/SearchCustomer';
import WithAccountNavigation from '../components/Layout/WithAccountNavigation';
import TransactionReport from '../reports/TransactionReport';
import { CustomerProvider } from '../contexts/CustomerContext';
import LateLoanReport from '../reports/LateLoanReport';
import './ManagerDashboard.css'; // Import the stylesheet

const ManagerDashboard = () => {
  return (
    <CustomerProvider>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <SideMenu />
          </div>
          <div className="dashboard-main">
            <Routes>
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="/management/*" element={<ManagementRoutes />} />
              <Route path="/customers/new/personal" element={<CustomerForm />} />
              <Route path="/customers/new/business" element={<BusinessCustomerForm />} />
              <Route path="/customers/search" element={<SearchCustomer />} />
              <Route path='/app/reports/transactions' element={<TransactionReport/>}/>
              <Route path='/app/reports/lateloans' element={<LateLoanReport/>}/>
              <Route path="/customers/*" element={<WithAccountNavigation><CustomerRoutes /></WithAccountNavigation>} />
              <Route path="/app/*" element={<AppRoutes/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </CustomerProvider>
  );
};


export default ManagerDashboard;