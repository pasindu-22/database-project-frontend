import React from 'react';
import { Button, Form, Input, Space , message} from 'antd';
import axios from 'axios';
import {useAuth} from '../../contexts/AuthContext';

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};


const InfoUpdate = () => {
  const [form] = Form.useForm();
  const { details } = useAuth();

  const handleLogin = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/customers/${details.Customer_ID}`, values);
      console.log('Login response:', response.data);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
  };

  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off"
    onFinish={handleLogin}
    style={{width: '95%',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
    >
      <Form.Item
        name="Username"
        label="Username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default InfoUpdate;