import React,{useState, useEffect} from 'react';
import { Form, Input, Button, DatePicker, Select, message, InputNumber } from 'antd';
// import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;

const TransactionForm = () => {
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState([]);            // State to store account data
  const {details} = useAuth();        // Get user details from AuthContext

  const onFinish = (values) => {
    const transactionData = {
      FromAccount: values.FromAccount,
      ToAccount: values.ToAccount,
      Date: values.Date.format('YYYY-MM-DD'),  // Format date for backend
      Value: values.Value,
      Type: values.Type,
    };

    axiosInstance.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/transactions/', transactionData)
      .then((response) => {
        const { Transaction_ID } = response.data;
        message.success(`Transaction successful! Transaction ID: ${Transaction_ID}`);
        form.resetFields(); // Optionally reset the form after successful submission
      })
      .catch((error) => {
        message.error('Transaction failed. Please try again.');
      });
  };

  useEffect(() => {     // Fetch account data after component mount to show in dropdown. 
    const fetchAccountData = async () => {
      try {
        const response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/accounts/customer/${details.Customer_ID}`);
        setAccounts(response.data);
      } catch (error) {
        console.error("There was an error fetching the account data!", error);
      }
    };

    fetchAccountData();
    
  }, [details.Customer_ID]);

  return (
    
    <Form
      form={form}
      
      onFinish={onFinish}
      style={{width: '95%',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
    >
      <Form.Item
        name="FromAccount"
        label="From Account"
        style={{width: '100%'}}
        rules={[
          { required: true, message: 'Please input the From Account!' },
        ]}
      >
        <Select placeholder="Select Account ID">
          {accounts.map(account => (
            <Option key={account.Account_ID} value={account.Account_ID} label={`${account.Account_ID}`}>
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
        label="Transaction Note"
        rules={[{ required: true, message: 'Please select the transaction type!' }]}
      >
        <Input placeholder="Enter Note" />
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