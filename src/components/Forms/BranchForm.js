import React from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const onFinish = async (values) => {
  try {
    const response = await axios.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/branches/', values);
    message.success('Branch created successfully!');
  } catch (error) {
    console.error('There was an error creating the branch!', error);
    message.error('Failed to create branch');
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const BranchForm = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Create Branch</Title>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'rgba(224, 247, 250, 0.8)',
            borderRadius: '15px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true, message: 'Please enter address!' }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact_info"
            rules={[{ required: true, message: 'Please input your contact!' }]}
          >
            <Input placeholder="Enter Contact" />
          </Form.Item>

          <Form.Item
            label="Admin ID"
            name="Manager_ID"
            rules={[{ required: true, message: 'Enter admin id' }]}
          >
            <Input placeholder="Enter Admin ID" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BranchForm;