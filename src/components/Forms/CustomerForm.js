import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
// import Title from 'antd/es/skeleton/Title';

const { Title } = Typography;

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
    const { Name, NIC, Address ,username,password} = values;
    const customerData = { Name, NIC, Address, username, password };
    try {
      const response = await axios.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/customers/',  customerData );
      alert('Customer created successfully!');
    } catch (error) {
      console.error('There was an error creating the user!', error);
      alert('Failed to create user');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '5px' }}>New Customer</Title>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Form
            // {...formItemLayout}
            form={form}
            onFinish={onFinish}
            style={{
              width: '100%',
              // maxWidth: '600px', // Set max-width for better form structure
              margin: '0 auto',
              padding: '20px',
              backgroundColor: 'rgba(224, 247, 250, 0.8)', // Semi-transparent to show background image
              borderRadius: '15px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
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
              style={{ width: '100%' }}
            >
              <Input  style={{ width: '100%' }}/>
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              // hasFeedback
              style={{ width: '100%' }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          </div>
          </div>
  );
};

export default CustomerForm;
