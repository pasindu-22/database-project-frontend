import React from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axios from 'axios';
import './AdminForm.css';

const { Title } = Typography;

const AdminForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/managers/', values);
      message.success('Admin created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('There was an error creating the user!', error);
      message.error('Failed to create user');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Create Manager</Title>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'rgba(224, 247, 250, 0.8)',
            borderRadius: '15px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          labelCol={{ span: 4 }} // Adjust the label column width
          wrapperCol={{ span: 16 }} // Adjust the input column width
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter the username!' }]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Create Manager
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminForm;