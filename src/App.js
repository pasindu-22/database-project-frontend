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
        <Route path="/customers/*" element={<CustomerRoutes/>} />
        <Route path="/app/*" element={<AppRoutes />} />
    </Routes>
  </div> 
  );
}

export default App;
