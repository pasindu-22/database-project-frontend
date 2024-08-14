import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const CustomerForm = () => {
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    console.log('Success:', values);
    const { Name, NIC, Address } = values;
    const customerData = { Name, NIC, Address };
    try {
      const response = await axios.post('http://localhost:3001/api/customers/',  customerData );
      console.log(response.data);
      alert('Customer created successfully!');
    } catch (error) {
      console.error('There was an error creating the user!', error);
      alert('Failed to create user');
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="customer_form"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        padding: 20,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="Name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="NIC"
        label="NIC"
        rules={[
          {
            required: true,
            message: 'Please input your NIC!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please input address!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Telephone"
        rules={[
          {
            required: true,
            message: 'Please input your telephone number!',
          },
        ]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
