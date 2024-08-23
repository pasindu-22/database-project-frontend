import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';


const onFinish = async(values) => {
  console.log('Success:', values);
  try {
    const response = await axios.post('http://localhost:3001/api/branches/',  values );
    console.log(response.data);
    alert('Branch created successfully!');
  } catch (error) {
    console.error('There was an error creating the user!', error);
    alert('Failed to create user');
  }
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const BranchForm = () => (
  <div justify="center">
  <Form 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
      padding: 20,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Address"
      name="address"
      rules={[
        {
          required: true,
          message: 'Please Enter address!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Contact"
      name="contact_info"
      rules={[
        {
          required: true,
          message: 'Please input your contact!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Admin ID"
      name="admin_id"
      rules={[
        {
          required: true,
          message: 'Enter admin id',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
);

export default BranchForm;