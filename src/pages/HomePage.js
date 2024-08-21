import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNewTransaction = () => {
    navigate('/app/transactions/new');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Employee Dashboard</h1>
      <Button type="primary" onClick={handleNewTransaction}>
        New Transaction
      </Button>
    </div>
  );
};

export default HomePage;
