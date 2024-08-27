// components/LoginModal.js
import React, { useState } from 'react';
import { Modal, Input, Button, Form, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal = ({ visible, onClose, role }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3001/api/${role}s/login`, values);
      login({ ...response.data, role });
      console.log('Login response:', response.data);
      message.success('Login successful');
      onClose();
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Login"
      visible={visible}
      onCancel={onClose}
      footer={null}
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;