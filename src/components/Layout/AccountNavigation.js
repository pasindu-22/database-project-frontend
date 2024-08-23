import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { CustomerContext } from '../../contexts/CustomerContext';

const items = [
  {
    label: 'Accounts',
    key: 'accounts/details',
    icon: <MailOutlined />,
  },
  {
    label: 'Profile',
    key: 'profile/details',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  {
    label: 'New',
    key: 'accounts/',
    icon: <SettingOutlined />,
    children: [
          {
            label: 'Saving Account',
            key: 'accounts/new',
          },
          {
            label: 'Fixed Deposit',
            key: 'accounts/fd/new',
          },
          
        ],
      },
  {
    label: 'System Logs',
    key: 'logs',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
];

const CustomerNavigation = () => {
  const [current, setCurrent] = useState('accounts');
  const navigate = useNavigate();
  const { customerId } = useContext(CustomerContext);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(`/customers/${customerId}/${e.key}`); // Navigate to the route specified in the key with customer ID
  };

  return (
  <Menu 
  onClick={onClick} 
  selectedKeys={[current]} 
  mode="horizontal" 
  items={items} 
  style={{
    width: '100vh',
    backgroundColor: 'darkgray',
    borderRadius: '10px',
  }} 
  defaultSelectedKeys={['profile']}
  defaultOpenKeys={['profile']}
  />
);
};

export default CustomerNavigation;