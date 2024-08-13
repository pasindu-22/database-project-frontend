import React from 'react';
import {Routes,Route} from 'react-router-dom';
import "antd/dist/reset.css";
import './App.css';
import SideMenu from './components/Layout/SideMenu';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AuthRoutes from './routes/AuthRoutes';
import ManagementRoutes from './routes/ManagementRoutes';
import AppRoutes from './routes/AppRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import CustomerNavigation from './components/Layout/CustomerNavigation';
import CustomerForm from './components/Forms/CustomerForm';
import ProfilePage from './pages/ProfilePage';
import ProfileRoutes from './routes/ProfileRoutes';
import AccountRoutes from './routes/AccountRoutes';
 
function App() {
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1, height:"100vh", background:"#b7dcfa"}}>
      <Header/>
        <div style={{display:"flex",flexDirection:"row",flex:1, backgroundColor:"#b7dcfa"}}>
          <SideMenu/>
          <Content/>
        </div>
      <Footer/>
    </div>
  );
}
 

// define routes
function Content() {
  return  (
  <div>  
    <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/management/*" element={<ManagementRoutes />} />
        <Route path="/customers/individual/new" element={<CustomerForm />} />
        <Route path="/customers/Business/new" element={<CustomerForm />} />
        <Route path="/customers/*" element={<WithCustomerNavigation><CustomerRoutes /></WithCustomerNavigation>} />
        {/* <Route
          path="/customers/*"
          element={
            <WithTopMenu>
              <CustomerRoutes />
              <ProfileRoutes/>
              <AccountRoutes/>
            </WithTopMenu>
          }
        /> */}
        <Route path="/app/*" element={<AppRoutes />} />
    </Routes>
  </div> 
  );
}


// WithCustomerNavigation function
function WithCustomerNavigation({ children }) {
  return (
    <>
      <CustomerNavigation />
      <div style={{ padding: '16px', backgroundColor: '#b7dcfa', height: '100%' }}>
        {children}
      </div>
    </>
  );
}

export default App;
