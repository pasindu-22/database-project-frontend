import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
// import {jwtDecode} from 'jwt-decode';

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost:5000/api/admins/login', values);
      console.log(response.data);

      if (response.data.success) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        
        // Redirect based on user role
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        alert('Validation failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('There was an error validating admin!', error);
      alert('Failed Validation');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // useEffect(() => {
  //   const checkTokenExpiration = () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const decodedToken = jwtDecode(token);
  //       const currentTime = Date.now() / 1000;

  //       if (decodedToken.exp < currentTime) {
  //         // Token has expired
  //         console.log('Token has expired');
  //         localStorage.removeItem('token');
  //         alert('Session has expired. Please log in again.');
  //         navigate('/login');
  //       }
  //     }
  //   };

  //   // Check token expiration immediately
  //   checkTokenExpiration();

  //   // Set up an interval to check token expiration every minute
  //   const intervalId = setInterval(checkTokenExpiration, 60000);

  //   // Clear the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [navigate]);

  return (
    <div style={{display:"flex",flexDirection:"row",flex:1, height:"100vh", background:"#b7defb"}}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span:25 ,
      }}
      
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 25,
        backgroundColor: 'lightskyblue',
        borderRadius: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginForm;
