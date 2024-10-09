import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Typography } from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the import path as needed

const { Option } = Select;
const { Title } = Typography;

const OnlineLoanForm = () => {
  const [form] = Form.useForm();
  const [fds, setFds] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext
  const customerId = user?.Customer_ID;

  useEffect(() => {
    if (customerId) {
      // Fetch FDs under the customer ID
      axios.get(`http://localhost:3001/api/fixedDeposits/customer/${customerId}`) 
        .then(response => {
          setFds(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the FDs!', error);
        });
    }
  }, [customerId]);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/loans/quick-loan/', { ...values, Customer_ID: customerId });
      console.log(response.data);
      message.success('Loan created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('There was an error creating the loan!', error);
      message.error('Failed to create loan');
    }
  }; 

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '5px' }}>Quick Online Loan</Title>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{
              width: '100%',
              margin: '20px auto',
              padding: '20px',
              backgroundColor: 'rgba(224, 247, 250, 0.8)',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
          <Form.Item
            name="Branch_ID"
            label="Branch ID"
            rules={[{ required: true, message: 'Please enter the Branch ID!' }]}
          >
            <Input placeholder="Enter Branch ID" />
          </Form.Item>

          <Form.Item
            name="LoanPeriod"
            label="Loan Period"
            rules={[{ required: true, message: 'Please enter the Loan Period!' }]}
          >
            <Input placeholder="Enter Loan Period" />
          </Form.Item>

          <Form.Item
            name="InterestRate"
            label="Interest Rate"
            rules={[{ required: true, message: 'Please enter the Interest Rate!' }]}
          >
            <Input placeholder="Enter Interest Rate" />
          </Form.Item>

          <Form.Item
            name="Date"
            label="Date"
            rules={[{ required: true, message: 'Please select the Date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="LoanValue"
            label="Loan Value"
            rules={[{ required: true, message: 'Please enter the Loan Value!' }]}
          >
            <Input placeholder="Enter Loan Value" />
          </Form.Item>

          <Form.Item
            name="FD_ID"
            label="FD ID"
            rules={[{ required: true, message: 'Please select the FD ID!' }]}
          >
            <Select placeholder="Select FD ID">
              {fds.map(fd => (
                <Option key={fd.FD_ID} value={fd.FD_ID}>
                  ID: {fd.FD_ID} -   Amount: {fd.InitialAmount}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
    </div>
    </div>
  );
};

export default OnlineLoanForm;