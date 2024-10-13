import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message, InputNumber, Typography, Steps } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

const TransactionForm = () => {
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState([]); // State to store account data
  const { details } = useAuth(); // Get user details from AuthContext
  const [current, setCurrent] = useState(0); // State to manage current step

  const onFinish = (values) => {
    if (!values.Date) {
      message.error('Please select a transaction date.');
      return;
    }

    const transactionData = {
      FromAccount: values.FromAccount,
      ToAccount: values.ToAccount,
      Date: values.Date.format('YYYY-MM-DD'), // Format date for backend
      Value: values.Value,
      Type: values.Type,
    };
    console.log(transactionData);

    axiosInstance
      .post('http://localhost:3001/api/transactions/', transactionData)
      .then((response) => {
        const { Transaction_ID } = response.data;
        message.success(`Transaction successful! Transaction ID: ${Transaction_ID}`);
        form.resetFields(); // Optionally reset the form after successful submission
      })
      .catch((error) => {
        message.error('Transaction failed. Please try again.');
      });
  };

  useEffect(() => {
    // Fetch account data after component mount to show in dropdown.
    const fetchAccountData = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/accounts/customer/${details.Customer_ID}`
        );
        setAccounts(response.data);
      } catch (error) {
        console.error('There was an error fetching the account data!', error);
      }
    };

    fetchAccountData();
  }, [details]);

  const steps = [
    {
      title: 'Account Details',
      content: (
        <>
          <Form.Item
            name="FromAccount"
            label="From Account"
            rules={[
              { required: true, message: 'Please select the From Account!' },
            ]}
            style={{ width: '100%' }}
          >
            <Select placeholder="Select Account ID">
              {accounts.map((account) => (
                <Option key={account.Account_ID} value={account.Account_ID}>
                  {account.Account_ID} - Balance: Rs.{account.Balance}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ToAccount"
            label="To Account"
            rules={[
              { required: true, message: 'Please input the To Account!' },
              { type: 'number', message: 'To Account must be an integer!' },
            ]}
            style={{ width: '100%' }}
          >
            <InputNumber placeholder="Enter To Account" style={{ width: '100%' }} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Transaction Details',
      content: (
        <>
          <Form.Item
            name="Date"
            label="Transaction Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
            style={{ width: '100%' }}
          >
            <DatePicker placeholder="Select Date" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="Value"
            label="Transaction Value"
            rules={[
              { required: true, message: 'Please input the transaction value!' },
              { type: 'number', message: 'Transaction Value must be a number!' },
            ]}
            style={{ width: '100%' }}
          >
            <InputNumber placeholder="Enter Value" style={{ width: '100%' }} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Submit',
      content: (
        <>
          <Form.Item
            name="Type"
            label="Transaction Note"
            rules={[{ required: true, message: 'Please input a transaction note!' }]}
            style={{ width: '100%' }}
          >
            <Input placeholder="Enter Note" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%', alignSelf: 'center' }}>
              Submit
            </Button>
          </Form.Item>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '5px' }}>New Transaction</Title>
      <Steps current={current} style={{ marginBottom: '20px' }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'rgba(224, 247, 250, 0.8)', // Semi-transparent to show background image
            borderRadius: '15px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          labelCol={{ span: 3 }} // Adjust the label column width
          wrapperCol={{ span: 20 }} // Adjust the input column width
        >
          {steps[current].content}
          <Form.Item style={{ textAlign: 'center' }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TransactionForm;