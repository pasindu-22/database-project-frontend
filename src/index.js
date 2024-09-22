import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import LoginForm from './Forms/LoginForm'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CustomerLogin from './customer/components/CustomerLogin';
import ManagerLogin from './manager/components/ManagerLogin';
import EmployeeLogin from './employee/components/EmployeeLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/customer-login" />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/*" element={<App />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
