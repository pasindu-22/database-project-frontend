import React, { useEffect, useState, useContext } from 'react';
import { Layout, List, Card, Typography, Spin } from 'antd';
import axios from 'axios';
import { CustomerContext } from '../contexts/CustomerContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const { customerId } = useContext(CustomerContext);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/accounts/customer/${customerId}`);
        setAccountData(response.data);
      } catch (error) {
        console.error("There was an error fetching the account data!", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchAccountData();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (accountData.length === 0) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No account data found</p>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' , borderRadius:'20'}}>
      <Header style={{ background: '#b7dcfa', padding: 0, textAlign: 'center' }}>
        <Title level={2}>Customer Accounts</Title>
      </Header>
      <Content style={{ background: '#b7dcfa', padding: '50px' }}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={accountData}
          renderItem={account => (
            <List.Item>
              <Card title={`Account ID: ${account.Account_ID}`}>
                <p>Branch ID: {account.Branch_ID}</p>
                <p>Type: {account.Type}</p>
                <p>Plan: {account.Plan}</p>
                <p>Opening Date: {account.OpeningDate}</p>
                <p>Balance: {account.Balance}</p>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default AccountPage;