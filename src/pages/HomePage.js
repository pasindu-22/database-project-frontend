import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNewTransaction = () => {
    navigate('/app/transactions/new');
  };

  const handleNewCustomer = () => {
    navigate('/customers/new');
  };

  return (
    <>
    <div style={{ padding: '20px' }}>
      <h1>Hey!</h1>
      <Button type="primary" onClick={handleNewTransaction} style={{
        padding: '20px 40px',        // Increased padding for a larger button
        fontSize: '24px',            // Larger font size
        border: 'none',              // No border
        borderRadius: '10px',        // Rounded corners
        cursor: 'pointer',           // Pointer cursor on hover
        width: '200px',              // Specific width
        height: '80px'
      }}>
        New Transaction
      </Button>
      
    </div>
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleNewCustomer} style={{
        padding: '20px 40px',        // Increased padding for a larger button
        fontSize: '24px',            // Larger font size
        border: 'none',              // No border
        borderRadius: '10px',        // Rounded corners
        cursor: 'pointer',           // Pointer cursor on hover
        width: '200px',              // Specific width
        height: '80px'
      }}>
        New Customer
        </Button>
    </div>
    </>
  );
};

export default HomePage;
