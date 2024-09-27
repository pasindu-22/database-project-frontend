import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const onFinish = async (values) => {
  console.log('Success:', values);
  try {
    const response = await axios.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/branches/', values);
    console.log(response.data);
    alert('Branch created successfully!');
  } catch (error) {
    console.error('There was an error creating the branch!', error);
    alert('Failed to create branch');
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const BranchForm = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="Address"
          rules={[{ required: true, message: 'Please enter address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact_info"
          rules={[{ required: true, message: 'Please input your contact!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Admin ID"
          name="Manager_ID"
          rules={[{ required: true, message: 'Enter admin id' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BranchForm;