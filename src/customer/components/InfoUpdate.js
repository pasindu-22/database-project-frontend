import React from 'react';
import { Button, Form, Input, Typography, Space , message} from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import {useAuth} from '../../contexts/AuthContext';
// import Title from 'antd/es/skeleton/Title';

const { Title } = Typography;

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
      const response = await axiosInstance.put(`http://localhost:3001/api/customers/${details.Customer_ID}`, values);
      console.log('Login response:', response.data);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
  };

  return (
    <div style={{padding: '20px'}}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '5px' }}>Update Login Details</Title>
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off"
        onFinish={handleLogin}
        style={{width: '95%',
            margin: '20px',
            padding: '20px',
            backgroundColor: 'rgba(224, 247, 250, 0.8)',
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
    </div>
  );
};
export default InfoUpdate;