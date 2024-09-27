import React, { useState, useContext } from 'react';
import { Input, Button, Form, message, Layout } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from '../../contexts/CustomerContext';

const { Header, Content } = Layout;

const SearchCustomer = () => {
  const [customerID, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCustomerId } = useContext(CustomerContext);

  const handleSearch = async () => {
    if (!customerID) {
      message.error('Please enter a customer ID or account number');
      return;
    }

    setLoading(true);

    try {
        const response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/${customerID}`);

      if (response.status === 200) {
        message.success('Customer found!');
        setCustomerId(response.data.Customer_ID); // Store customer ID in context
        navigate(`/customers/${response.data.Customer_ID}/profile/details`); // Redirect to customer menu
      } else {
        message.error('Customer not found.');
      }
    } catch (error) {
      console.error('An error searching for the customer!', error);
      message.error('An error occurred while searching. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'lightskyblue', padding: 0, textAlign: 'center' ,borderRadius:'10px'}}>
        <h1>Customer Search</h1>
      </Header>
      <Content style={{ background: '#b7dcfa', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item>
            <Input
              placeholder="Enter Customer ID or Account Number"
              value={customerID}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default SearchCustomer;