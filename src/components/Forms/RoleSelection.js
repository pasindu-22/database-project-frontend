import React, { useState } from 'react';
import { Button, Card, Typography, Row, Col, Form, Input, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/RoleSelection.css';
import backgroundImage from '../Layout/entryPic.jpg';
import LoginModal from '../Modals/LoginModal';

const { Title } = Typography;

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3001/api/customers/login`, values);
      login({ ...response.data, role: 'customer' });
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
        title={<Title level={2} style={{ textAlign: 'center' }}>A Bank Login Portal</Title>}
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
        <Row gutter={[16, 16]} justify='center'>
          <Col span={24}>
            <hr style={{ margin: '16px 0' }} />
          </Col>
          <Col span={24}>
            <Title level={4} style={{ textAlign: 'center' }}>An Employee?</Title>
          </Col>
          <div style={{ display: 'flex', direction: 'row' }}>
            <Col span={10}>
              <Button type="primary" block size="medium" onClick={() => handleRoleSelection('manager')}
                style={{ borderRadius: '80px' }}>
                Manager
              </Button>
            </Col>
            <Col span={10}>
              <Button type="primary" block size="medium" onClick={() => handleRoleSelection('employee')}
                style={{ borderRadius: '80px' }}>
                Employee
              </Button>
            </Col>
          </div>
        </Row>
      </Card>
      <LoginModal visible={isModalVisible} onClose={handleCloseModal} role={selectedRole} />
    </div>
  );
};

export default RoleSelection;