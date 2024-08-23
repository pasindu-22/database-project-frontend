import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const FixedDepositForm = () => {
  const [form] = Form.useForm();

  const periodMapping = {
    '3 months': 3,
    '6 months': 6,
    '1 year': 12,
    '3 years': 36,
  };
  
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/fixedDeposits/', {
        ...values,
        StartDate: values.StartDate.format('YYYY-MM-DD'), // Format date to string
        Period: periodMapping[values.Period], // Map period to integer
      });
      message.success('Fixed Deposit created successfully!');
      console.log(response.data);
    } catch (error) {
      message.error('Failed to create Fixed Deposit.');
      console.error(error);
    }
  };
 
  return (
    <Form
      form={form}
      name="fixed-deposit-form"
      onFinish={onFinish}
      initialValues={{
        StartDate: moment(),  // Default to current date
      }}
      layout="vertical"
    >
      <Form.Item
        label="Branch ID"
        name="Branch_ID"
        rules={[{ required: true, message: 'Please input Branch ID!' }]}
      >
        <Input placeholder="Enter Branch ID" />
      </Form.Item>

      <Form.Item
        label="Account ID"
        name="Account_ID"
        rules={[{ required: true, message: 'Please input Account ID!' }]}
      >
        <Input placeholder="Enter Account ID" />
      </Form.Item>

      <Form.Item
        label="Period"
        name="Period"
        rules={[{ required: true, message: 'Please select Period!' }]}
      >
        <Select placeholder="Select Period">
          <option value="3 months">3 months</option>
          <Option value="6 months" >6 months</Option>
          <Option value="1 year">1 year</Option>
          <Option value="3 years">3 years</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="StartDate"
        rules={[{ required: true, message: 'Please select Start Date!' }]}
      >
        <DatePicker defaultValue={moment()} />
      </Form.Item>

      <Form.Item
        label="Initial Amount"
        name="InitialAmount"
        rules={[{ required: true, message: 'Please input Initial Amount!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter Initial Amount"
          min={1}
          step={0.01}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FixedDepositForm;
