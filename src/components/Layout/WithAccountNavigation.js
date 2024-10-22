import React from 'react';
import AccountNavigation from './AccountNavigation';

const WithAccountNavigation = ({ children }) => {
  return (
    <>
      <AccountNavigation />
      <div style={{ padding: '25px', backgroundColor: 'transparent', height: '100%' }}>
        {children}
      </div>
    </>
  );
};

export default WithAccountNavigation;