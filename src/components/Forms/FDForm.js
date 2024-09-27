import { Form, Input, Button, DatePicker, Select, InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;

const FixedDepositForm = ({userType}) => {    // Prop for conditionally render account info based on user type.
  const [form] = Form.useForm();              
  const [accounts, setAccounts] = useState([]);            // State to store account data
  const {details} = useAuth();        // Get user details from AuthContext

  const periodMapping = {       // Period mapping for dropdown
    '6 months': 6,
    '1 year': 12,
    '3 years': 36,
  };
  
  const onFinish = async (values) => {            // Function to control form submission(Send data to backend).
    try {
      const response = await axiosInstance.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/fixedDeposits/', {
        ...values,
        StartDate: values.StartDate.format('YYYY-MM-DD'), // Format date to string
        Period: periodMapping[values.Period], // Map period to integer
        Customer_ID:details.Customer_ID,
      });
      message.success('Fixed Deposit created successfully!');
      console.log(response.data);
    } catch (error) {
      message.error('Failed to create Fixed Deposit.');
      console.error(error);
    }
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
      name="fixed-deposit-form"
      onFinish={onFinish}
      initialValues={{
        StartDate: moment(),  // Default to current date
      }}
      layout="vertical"
      style={{ width: '100%',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
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
        {userType === 'customer' ? (
        <Select placeholder="Select Account ID">
          {accounts.map(account => (
            <Option key={account.Account_ID} value={account.Account_ID} label={`${account.Account_ID}`}>
              {account.Account_ID} - Balance: Rs.{account.Balance}
            </Option>
          ))}
        </Select>
        ) : (
          <Input placeholder="Enter Account ID"/>
        )}
      </Form.Item>

      <Form.Item
        label="Period"
        name="Period"
        rules={[{ required: true, message: 'Please select Period!' }]}
      >
        <Select placeholder="Select Period">
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
