import React, { useState } from 'react';
import { Button, Card, Typography, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Login.css';
import backgroundImage from '../../components/Layout/entryPic.jpg';

const { Title } = Typography;

const CustomerLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [Customer_ID, setCustomerID] = useState('');

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3001/api/customers/login`, values);
      if (response.data.message) {
        setCustomerID(response.data.Customer_ID);
        console.log(response.data.Customer_ID, Customer_ID)
        message.success('Succefull Verification, please enter the OTP sent to your email.');
        setOtpModalVisible(true);
      } else {
        message.error('Verify failed');
      }
    } catch (error) {
      message.error('Verify failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/customers/verify-otp`, { Customer_ID , otp });
      if (response.data.message = "Login successful") {
        login({ ...response.data, role: 'customer' });
        message.success('OTP verified successfully');
        setOtpModalVisible(false);
      } else {
        message.error('Invalid OTP');
      }
    } catch (error) {
      message.error('OTP verification failed');
    }
  };

  return (
    <div 
        className="animated-background"
        style={{
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
      className='animated-form'
      title={<Title level={2} style={{ textAlign: 'center' }}>Customer Login</Title>}
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
            Customer Login
          </Button>
        </Form.Item>
      </Form>
    </Card>

    <Modal
      title="Enter OTP Sent to Your Email"
      visible={otpModalVisible}
      onOk={handleOtpSubmit}
      onCancel={() => setOtpModalVisible(false)}
    >
      <Form>
        <Form.Item
          name="otp"
          rules={[{ required: true, message: 'Please enter the OTP' }]}
        >
          <Input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>

    </div>
  );
};

export default CustomerLogin;