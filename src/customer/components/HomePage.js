import React, { useEffect, useState } from 'react';
import { Card, List, Spin, Row, Col, Typography, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const { Title } = Typography;

const HomePage = () => {
  const { details } = useAuth(); // Correctly use the useAuth hook
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (details && details.Customer_ID) {
      // Fetch the brief info once customerId is set
      const fetchBriefInfo = async () => {
        try {
          const response = await axiosInstance.get(`/customers/brief-info/${details.Customer_ID}`);
          setData(response.data);
        } catch (error) {
          message.error('Failed to fetch customer data');
        } finally {
          setLoading(false);
        }
      };
      fetchBriefInfo();
    }
  }, [details]);

  if (loading) {
    return (
      <Row justify="center" style={{ padding: '20px' }}>
        <Spin size="large" />
      </Row>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const cardStyle = { height: '300px', overflowY: 'auto' }; // Set a fixed height with scrolling

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Welcome, {data.user?.name}</Title>
      
      <Row gutter={16}>
        <Col span={8}>
            <Card title="Customer Information" bordered={false} style={{ ...cardStyle, backgroundColor: 'rgba(224, 247, 250, 0.8)' }}>
              <p><strong>Name:</strong> {data.user?.Name}</p>
              <p><strong>NIC:</strong> {data.user?.NIC}</p>
              <p><strong>Address:</strong> {data.user?.Address}</p>
            </Card>
          </Col>

          {/* Accounts Information Card */}
        <Col span={8}>
          <Card title="Accounts" bordered={false} style={{ ...cardStyle, backgroundColor: 'rgba(224, 247, 250, 0.8)' }}>
            <List
              itemLayout="horizontal"
              dataSource={data.accounts}
              renderItem={account => (
                <List.Item>
                  <List.Item.Meta
                    title={`Account ID: ${account.Account_ID}`}
                    description={`Balance: ${account.Balance}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Loan Information Card */}
        <Col span={8}>
          <Card title="Loans" bordered={false} style={{ ...cardStyle, backgroundColor: 'rgba(224, 247, 250, 0.8)' }}>
            <List
              itemLayout="horizontal"
              dataSource={data.loans}
              renderItem={loan => (
                <List.Item>
                  <List.Item.Meta
                    title={`Loan ID: ${loan.Loan_ID}`}
                    description={`Loan Value: ${loan.LoanValue}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        {/* Fixed Deposits Information Card */}
        <Col span={8}>
          <Card title="Fixed Deposits" bordered={false} style={{ ...cardStyle, backgroundColor: 'rgba(224, 247, 250, 0.8)' }}>
            <List
              itemLayout="horizontal"
              dataSource={data.fds}
              renderItem={fd => (
                <List.Item>
                  <List.Item.Meta
                    title={`FD ID: ${fd.FD_ID}`}
                    description={`Amount: ${fd.Amount}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
