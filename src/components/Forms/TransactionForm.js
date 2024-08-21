import React from 'react';
import { Form, Input, Button, DatePicker, Select, message, InputNumber } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const TransactionForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const transactionData = {
      FromAccount: values.FromAccount,
      ToAccount: values.ToAccount,
      Date: values.Date.format('YYYY-MM-DD'),  // Format date for backend
      Value: values.Value,
      Type: values.Type,
    };

    axios.post('http://localhost:3001/api/transactions/', transactionData)
      .then((response) => {
        const { Transaction_ID } = response.data;
        message.success(`Transaction successful! Transaction ID: ${Transaction_ID}`);
        form.resetFields(); // Optionally reset the form after successful submission
      })
      .catch((error) => {
        message.error('Transaction failed. Please try again.');
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="FromAccount"
        label="From Account"
        rules={[
          { required: true, message: 'Please input the From Account!' },
          { type: 'number', message: 'From Account must be an integer!' }
        ]}
      >
        <InputNumber placeholder="Enter From Account" />
      </Form.Item>

      <Form.Item
        name="ToAccount"
        label="To Account"
        rules={[
          { required: true, message: 'Please input the To Account!' },
          { type: 'number', message: 'To Account must be an integer!' }
        ]}
      >
        <InputNumber placeholder="Enter To Account" />
      </Form.Item>

      <Form.Item
        name="Date"
        label="Transaction Date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker placeholder="Select Date" />
      </Form.Item>

      <Form.Item
        name="Value"
        label="Transaction Value"
        rules={[
          { required: true, message: 'Please input the transaction value!' },
          { type: 'number', message: 'Transaction Value must be an integer!' }
        ]}
      >
        <InputNumber placeholder="Enter Value"  />
      </Form.Item>

      <Form.Item
        name="Type"
        label="Transaction Type"
        rules={[{ required: true, message: 'Please select the transaction type!' }]}
      >
        <Select placeholder="Select Type">
          <Option value="credit">Credit</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;