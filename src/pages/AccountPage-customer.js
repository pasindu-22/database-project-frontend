import React, { useEffect, useState, useContext } from 'react';
import { Layout, List, Card, Typography, Spin } from 'antd';
import axios from 'axios';
import { CustomerContext } from '../contexts/CustomerContext';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const AccountPageCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const { details } = useAuth();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/accounts/customer/${details.Customer_ID}`);
        setAccountData(response.data);
      } catch (error) {
        console.error("There was an error fetching the account data!", error);
      } finally {
        setLoading(false);
      }
    };

    if (details && details.Customer_ID) {
      fetchAccountData();
    } else {
      setLoading(false);
    }
  }, [details.Customer_ID]);

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
      <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
        <Title level={2}>Customer Accounts</Title>
      </Header>
      <Content style={{ background: '#A9A9A9', padding: '50px' }}>
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

export default AccountPageCustomer;