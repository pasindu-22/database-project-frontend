import { Form, Input, Button, DatePicker, Select, InputNumber, message, Typography, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';

const { Title } = Typography;
const { Option } = Select;

const FixedDepositForm = ({ userType }) => {    // Prop for conditionally render account info based on user type.
  const [form] = Form.useForm();
  const [accounts, setAccounts] = useState([]);            // State to store account data
  const { details } = useAuth();        // Get user details from AuthContext
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [fdDetails, setFdDetails] = useState(null); // State to store fixed deposit details

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
        Customer_ID: details.Customer_ID,
      });
      message.success('Fixed Deposit created successfully!');
      setFdDetails(response.data); // Store the received fixed deposit details
      setIsModalVisible(true); // Show the modal with the fixed deposit details
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

  }, [details]);

  const handleModalOk = () => {
    setIsModalVisible(false);
    form.resetFields(); // Optionally reset the form after closing the modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>New Fixed Deposit</Title>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'rgba(224, 247, 250, 0.8)',
            borderRadius: '15px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          labelCol={{ span: 4 }} // Adjust the label column width
          wrapperCol={{ span: 16 }} // Adjust the input column width
        >

          <Form.Item
            label="Branch Number"
            name="Branch_ID"
            rules={[{ required: true, message: 'Please input Branch ID!' }]}
          >
            <Input placeholder="Enter Branch ID" />
          </Form.Item>

          <Form.Item
            label="Account Number"
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
              <Input placeholder="Enter Account ID" />
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
            <DatePicker placeholder="Select Date" style={{ width: '100%' }} />
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Fixed Deposit Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        {fdDetails && (
          <div>
            <p><strong>Fixed Deposit Number:</strong> {fdDetails.FD_ID}</p>
            <p><strong>Branch Number:</strong> {fdDetails.Branch_ID}</p>
            <p><strong>Account Number:</strong> {fdDetails.Account_ID}</p>
            <p><strong>Start Date:</strong> {fdDetails.StartDate}</p>
            <p><strong>Period:</strong> {fdDetails.Period} months</p>
            <p><strong>Initial Amount:</strong> Rs.{fdDetails.InitialAmount}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FixedDepositForm;