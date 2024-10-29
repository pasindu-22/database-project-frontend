import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal, message, Typography } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const SavingsAccountForm = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [isPlanDisabled, setIsPlanDisabled] = useState(false);

  const onFinish = (values) => {
    // Format the date to ISO string
    values.OpeningDate = moment(values.OpeningDate).format('YYYY-MM-DD');

    // Set the Plan to null if account type is Checking
    if (values.Type === 'Checking') {
        values.Plan = null;
    }

    // Send data to the backend using Axios
    axiosInstance.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/accounts/', values)
      .then(response => {
        setAccountDetails(response.data);
        setModalVisible(true);
        form.resetFields();
      })
      .catch(error => {
        message.error('Failed to open savings account. Please try again.');
      });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleTypeChange = (value) => {
    setIsPlanDisabled(value === 'Checking');
    if (value === 'Checking') {
      form.setFieldsValue({ Plan: null });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>New Account</Title>
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
            name="Branch_ID"
            label="Branch ID"
            rules={[{ required: true, message: 'Please enter the branch ID!' }]}
          >
            <Input placeholder="Enter Branch ID" />
          </Form.Item>

          <Form.Item
            name="Customer_ID"
            label="Customer ID"
            rules={[{ required: true, message: 'Please enter the customer ID!' }]}
          >
            <Input placeholder="Enter Customer ID" />
          </Form.Item>

          <Form.Item
            name="Type"
            label="Account Type"
            rules={[{ required: true, message: 'Please select the account type!' }]}
          >
            <Select onChange={handleTypeChange}>
              <Option value="Savings">Savings</Option>
              <Option value="Checking">Checking</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Balance"
            label="Initial Balance"
            rules={[{ required: true, message: 'Please enter the initial balance!' }]}
          >
            <Input placeholder="Enter Initial Balance" />
          </Form.Item>

          <Form.Item
            name="OpeningDate"
            label="Opening Date"
            rules={[{ required: true, message: 'Please select the opening date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Plan"
            label="Plan"
            rules={[{ required: !isPlanDisabled, message: 'Please enter the plan!' }]}
          >
            <Select disabled={isPlanDisabled}>
              <Option value="Children">Children</Option>
              <Option value="Teen">Teen</Option>
              <Option value="Adult">Adult</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              Open Account
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Account Created Successfully"
        visible={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <p><strong>Account ID:</strong> {accountDetails.Account_ID}</p>
        <p><strong>Branch ID:</strong> {accountDetails.Branch_ID}</p>
        <p><strong>Customer ID:</strong> {accountDetails.Customer_ID}</p>
        <p><strong>Account Type:</strong> {accountDetails.Type}</p>
        <p><strong>Initial Balance:</strong> {accountDetails.Balance}</p>
        <p><strong>Opening Date:</strong> {accountDetails.OpeningDate}</p>
        <p><strong>Plan:</strong> {accountDetails.Plan}</p>
      </Modal>
    </div>
  );
};

export default SavingsAccountForm;