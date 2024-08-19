import React from 'react';
import CustomerNavigation from './CustomerNavigation';

const WithCustomerNavigation = ({ children }) => {
  return (
    <>
      <CustomerNavigation />
      <div style={{ padding: '16px', backgroundColor: '#b7dcfa', height: '100%' }}>
        {children}
      </div>
    </>
  );
};

export default WithCustomerNavigation;