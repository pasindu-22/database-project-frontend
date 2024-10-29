import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Calendar } from 'antd';
import { FolderOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Column } from '@ant-design/charts';  // Importing AntD Bar chart
import axios from 'axios';
import moment from 'moment';

const HomePage = () => {
  const navigate = useNavigate();
  const [superAccountData, setSuperAccountData] = useState([]); // State for super account data
  const [mainAccountData, setMainAccountData] = useState([]); // State for main account data
  const [events, setEvents] = useState([]); // State for calendar events

  // Fetching dummy data for super account balance
  useEffect(() => {
    const fetchSuperAccountData = async () => {
      try {
        const response = await axios.get('/api/super-account-balance');
        setSuperAccountData(response.data);
      } catch (error) {
        console.error('Error fetching super account balance:', error);
      }
    };

    const fetchMainAccountData = async () => {
      try {
        const response = await axios.get('/api/main-account-balance');
        setMainAccountData(response.data);
      } catch (error) {
        console.error('Error fetching main account balance:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/calendar-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchSuperAccountData();
    fetchMainAccountData();
    fetchEvents();
  }, []);

  // Dummy data for demonstration
  const dummySuperAccountData = [
    { date: '2024-08-01', balance: 5000 },
    { date: '2024-08-10', balance: 6000 },
    { date: '2024-08-20', balance: 7000 },
    { date: '2024-08-30', balance: 7500 },
    { date: '2024-09-01', balance: 5000 },
    { date: '2024-09-10', balance: 5324 },
    { date: '2024-09-20', balance: 7856 },
    { date: '2024-09-30', balance: 10500 },
    { date: '2024-10-01', balance: 11000 },
    { date: '2024-10-10', balance: 4052 },
    { date: '2024-10-20', balance: 6500 },
    { date: '2024-10-30', balance: 13500 },
    { data: '2024-11-01', balance: 11000 },
  ];

  // Chart configurations
  const superAccountConfig = {
    data: superAccountData.length > 0 ? superAccountData : dummySuperAccountData,
    xField: 'date',   // x-axis for date
    yField: 'balance', // y-axis for balance
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: { alias: 'Date' },
      balance: { alias: 'Balance' },
    },
    color: '#FFD700',
    columnWidthRatio: 0.3,  // Adjusted column width ratio for thinner columns
  };

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

        {/* Charts for super and main account balances */}
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12} style={{alignContent:'center'}}>
            <Card
              title="Super Account Balance Over Time"
              style={{ borderRadius: '10px' }}
            >
              <Column {...superAccountConfig} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;