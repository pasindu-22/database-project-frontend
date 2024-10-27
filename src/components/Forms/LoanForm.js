import React, { useEffect, useState} from 'react';
import { Form, Input, Button, Select, DatePicker, Spin, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;

const LoanApplicationForm = (isCustomerEditable) => {
  const [form] = Form.useForm();
  const { details } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (details) {
      setLoading(false);
    }
  }, [details]);

  const onFinish = (values) => {

    values.Date = values.Date.format('YYYY-MM-DD');
    values.Branch_ID = parseInt(values.Branch_ID, 10);
    values.Customer_ID = parseInt(values.Customer_ID, 10); 

    // Send form data to the backend
    axios.post('http://localhost:3001/api/loanApplications/', values)
      .then(response => {
        message.success('Loan application submitted successfully!');
        form.resetFields();
      })
      .catch(error => {
        message.error('Failed to submit loan application. Please try again.');
        console.error('Error:', error);
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Form 
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        Approved: 0,  // Default value for Approved
        Customer_ID: details.Customer_ID, // Set initial value from context if not editable
      }}
      style={{
        width: '100%',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Form.Item
        name="Branch_ID"
        label="Branch ID"
        rules={[{ required: true, message: 'Please input the Branch ID!' }]}
      >
        <Input placeholder="Enter Branch ID" />
      </Form.Item>

      <Form.Item
        name="Customer_ID"
        label="Customer ID"
        rules={[{ required: true, message: 'Please input the Customer ID!' }]}
      >
        {isCustomerEditable ? (
          <Input placeholder="Enter Customer ID" />
        ) : (
          <Input
            placeholder="Enter Customer ID"
            readOnly
            disabled
            value={details.Customer_ID}
          />
        )}
      </Form.Item>

      <Form.Item
        name="LoanPeriod"
        label="Loan Period (in months)"
        rules={[{ required: true, message: 'Please input the loan period!' }]}
      >
        <InputNumber min={1} placeholder="Enter Loan Period" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="Date"
        label="Application Date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="LoanValue"
        label="Loan Value"
        rules={[{ required: true, message: 'Please input the loan value!' }]}
      >
        <InputNumber
          min={1}
          placeholder="Enter Loan Value"
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="LoanType"
        label="Loan Type"
        rules={[{ required: true, message: 'Please select the loan type!' }]}
        initialValue={'Normal'}
      >
        <input disabled />
      </Form.Item>

      <Form.Item
        name="Approved"
        label="Approval Status"
        rules={[{ required: true, message: 'Please select the approval status!' }]}
        initialValue={0}
      >
        <Select placeholder="Select Approval Status">
          <Option value={0} disabled>Pending</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit Loan Application
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoanApplicationForm;
