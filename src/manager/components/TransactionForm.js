import React from 'react';
import { Form, Typography, Button, DatePicker, Select, message, InputNumber, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

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

    axios.post('https://database-backend-g8-d3f914ee6287.herokuapp.com/api/transactions/', transactionData)
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
    <div style={{padding: '10px'}}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '0px' }}>New Transaction</Title>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0px' }}>
          <Form
            form={form}
            
            onFinish={onFinish}
            style={{
              width: '100%',
              // maxWidth: '600px', // Set max-width for better form structure
              margin: '0 auto',
              padding: '20px',
              backgroundColor: 'rgba(224, 247, 250, 0.8)', // Semi-transparent to show background image
              borderRadius: '15px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Form.Item
              name="FromAccount"
              label="From Account"
              rules={[
                { required: true, message: 'Please input the From Account!' },
                { type: 'number', message: 'From Account must be an integer!' }
              ]}
            >
              <InputNumber placeholder="Enter From Account" style={{width:'100%'}}/>
            </Form.Item>

            <Form.Item
              name="ToAccount"
              label="To Account"
              rules={[
                { required: true, message: 'Please input the To Account!' },
                { type: 'number', message: 'To Account must be an integer!' }
              ]}
            >
              <InputNumber placeholder="Enter To Account" style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            name="Date"
            label="Transaction Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
            style={{ width: '100%' }}
            initialValue={moment()} // Set current date as default
          >
            <DatePicker placeholder="Select Date" style={{ width: '100%' }} disabled />
          </Form.Item> 
          

            <Form.Item
              name="Value"
              label="Transaction Value"
              rules={[
                { required: true, message: 'Please input the transaction value!' },
                { type: 'number', message: 'Transaction Value must be an integer!' }
              ]}
            >
              <InputNumber placeholder="Enter Value"  style={{width:'100%'}}/>
            </Form.Item>

            <Form.Item
              name="Type"
              label="Transaction Note"
              rules={[{ required: true, message: 'Please enter the transaction note!' }]}
            >
              <Input placeholder="Enter Note" style={{width:'100%'}}/>
              {/* <Select placeholder="Select Type">
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
              </Select> */}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  );
};

export default TransactionForm;