import React, { useState } from 'react';
import { Button, Card, Typography, Form, Input, message, Modal } from 'antd';
import axiosInstance from '../../utils/axiosInstance'; // Import the configured Axios instance
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Login.css';
import backgroundImage from '../../components/Layout/entryPic.jpg';

const { Title } = Typography;

const ManagerLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [Manager_ID, setManagerID] = useState('');

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`http://localhost:3001/api/managers/login`, values);
      if (response.data.message) {
        setManagerID(response.data.Manager_ID);
        console.log(response.data.Manager_ID, Manager_ID)
        message.success('Succefull Verification, please enter the OTP sent to your email.');
        setOtpModalVisible(true);
      } else {
        message.error('Issue with username or password');
      }
    } catch (error) {
      message.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axiosInstance.post(`http://localhost:3001/api/managers/verify-otp`, { Manager_ID , otp });
      if (response.data.message) {
        login({ ...response.data, role: 'manager' });
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
      title={<Title level={2} style={{ textAlign: 'center' }}>Manager Login</Title>}
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
            Manager Login
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

export default ManagerLogin;