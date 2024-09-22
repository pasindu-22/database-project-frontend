import React, { useState } from 'react';
import { Button, Card, Typography, Form, Input, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import backgroundImage from './../../components/Layout/entryPic.jpg';

const { Title } = Typography;

const EmployeeLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3001/api/employees/login`, values);
      login({ ...response.data, role: 'employee' });
      console.log('Cookies:', document.cookie); // Log cookies from the browser
      console.log('Login response:', response.data);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Optional: to cover the entire div
        backgroundPosition: 'center', // Optional: to center the image
        filter: 'brightness(90%)', // Optional: to darken the image
      }}>
    <Card
      title={<Title level={2} style={{ textAlign: 'center' }}>Employee Login</Title>}
      bordered={false}
      style={{ width: 400, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', backgroundColor: 'lightsteelblue' }}
    >
      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Employee Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default EmployeeLogin;