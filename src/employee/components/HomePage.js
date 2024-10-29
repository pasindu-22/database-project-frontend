// import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Calendar } from 'antd';
import { FolderOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();


  const handleNewTransaction = () => {
    navigate('/app/transactions/new');
  };

  const handleNewCustomer = () => {
    navigate('/customers/new/personal');
  };


  return (
    <>
      <div style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                textAlign: 'center',
              }}
              bodyStyle={{
                padding: '20px',
              }}
            >
              <FolderOutlined style={{ fontSize: '32px', color: '#FFD700' }} />
              <h3>New Transaction</h3>
              <Button type="primary" onClick={handleNewTransaction}>
                Go
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                textAlign: 'center',
              }}
              bodyStyle={{
                padding: '20px',
              }}
            >
              <CalendarOutlined style={{ fontSize: '32px', color: '#4F9DFF' }} />
              <h3>New Customer</h3>
              <Button type="primary" onClick={handleNewCustomer}>
                Go
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;