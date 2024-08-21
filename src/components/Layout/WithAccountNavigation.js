import React from 'react';
import AccountNavigation from './AccountNavigation';

const WithAccountNavigation = ({ children }) => {
  return (
    <>
      <AccountNavigation />
      <div style={{ padding: '16px', backgroundColor: '#b7dcfa', height: '100%' }}>
        {children}
      </div>
    </>
  );
};

export default WithAccountNavigation;