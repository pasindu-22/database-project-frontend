import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './AdminForm.css';

const AdminForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/managers/', values);
      console.log(response.data);
      message.success('Admin created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('There was an error creating the user!', error);
      message.error('Failed to create user');
    }
  };

  return (
    <Form
      form={form}
      className='form-container'
      onFinish={handleSubmit}
      layout="vertical"
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Manager
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;