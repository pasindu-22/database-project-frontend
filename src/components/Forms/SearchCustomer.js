import React, { useState, useContext } from 'react';
import { Input, Button, Form, message, Layout, Radio } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from '../../contexts/CustomerContext';

const { Header, Content } = Layout;

const SearchCustomer = () => {
  const [searchType, setSearchType] = useState('customerID');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCustomerId } = useContext(CustomerContext);

  const handleSearch = async () => {
    if (!searchTerm) {
      message.error('Please enter a search term');
      return;
    }

    setLoading(true);

    try {
      let response;
      switch (searchType) {
        case 'customerID':
          response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/${searchTerm}`);
          break;
        case 'NIC':
          response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/search/nic/${searchTerm}`);
          break;
        // case 'email':
        //   response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/search/email/${searchTerm}`);
        //   break;
        case 'username':
          response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/search/username/${searchTerm}`);
          break;
        case 'accountId':
          response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/search/account/${searchTerm}`);
          break;
        default:
          message.error('Invalid search type');
          setLoading(false);
          return;
      }

      if (response.status === 200) {
        message.success('Customer found!');
        setCustomerId(response.data.Customer_ID); // Store customer ID in context
        navigate(`/customers/${response.data.Customer_ID}/profile/details`); // Redirect to customer menu
      } else {
        message.error('Customer not found.');
      }
    } catch (error) {
      console.error('An error occurred while searching for the customer!', error);
      message.error('An error occurred while searching. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', borderRadius: '10px' }}>
        <h1>Customer Search</h1>
        <div style={{ padding: '20px' }}>
          <Form layout="vertical" onFinish={handleSearch}>
            <Form.Item label="Search By">
              <Radio.Group onChange={e => setSearchType(e.target.value)} value={searchType}>
                <Radio value="customerID">Customer ID</Radio>
                <Radio value="NIC">NIC</Radio>
                {/* <Radio value="email">Email</Radio> */}
                <Radio value="username">Username</Radio>
                <Radio value="accountId">Account ID</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={`Enter ${searchType}`}
                value={searchTerm}
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
        </div>
      </div>
    </div>
  );
};

export default SearchCustomer;