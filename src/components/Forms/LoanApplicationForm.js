import React from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const LoanApplicationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {

    values.Date = moment(values.Date).format('YYYY-MM-DD');
    values.Branch_ID = parseInt(values.Branch_ID, 10);
    values.Customer_ID = parseInt(values.Customer_ID, 10);
    console.log('Form values:', values);

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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        Approved: false,  // Default value for Approved
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
        <Input placeholder="Enter Customer ID" />
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
      >
        <Select placeholder="Select Loan Type">
          <Option value="Online">Online</Option>
          <Option value="Normal">Normal</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="Approved"
        label="Approved"
        valuePropName="checked"
        rules={[{ required: true, message: 'Please select the approval status!' }]}
      >
        <Select placeholder="Select Approval Status">
          <Option value={true}>Approved</Option>
          <Option value={false}>Pending</Option>
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
