import React, { useEffect, useState } from 'react';
import { Layout, List, Card, Typography, Spin } from 'antd';
// import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import useAxiosInterceptor from '../../utils/useAxiosInterceptor';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const AccountPageCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const { details } = useAuth();

  useAxiosInterceptor();  // USe this custome hook to handle session expiration

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/accounts/customer/${details.Customer_ID}`);
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
  }, [details]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Your Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large"/>
        </Content>
      </div>
    );
  }

  if (accountData.length === 0) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Your Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No account data found</p>
        </Content>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px'}}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Your Accounts</Title>
      
      <Content style={{  padding: '0px' ,margin:'auto'}}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={accountData}
          renderItem={account => (
            <List.Item>
              <Card 
              title={`Account Number: ${account.Account_ID}`}
              style={{backgroundColor: 'rgba(224, 247, 250, 0.8)'}}
              >
                <p>Branch Number: {account.Branch_ID}</p>
                <p>Type: {account.Type}</p>
                <p>Plan: {account.Plan}</p>
                <p>Opening Date: {new Date(account.OpeningDate).toLocaleDateString()}</p>
                <p>Balance: {account.Balance}</p>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </div>
  );
};

export default AccountPageCustomer;