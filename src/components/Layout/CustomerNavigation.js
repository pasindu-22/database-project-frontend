import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { CustomerContext } from '../../contexts/CustomerContext';

const items = [
  {
    label: 'Accounts',
    key: 'accounts',
    icon: <MailOutlined />,
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  {
    label: 'Transactions',
    key: 'transactions',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'option1',
          },
          {
            label: 'Option 2',
            key: 'option2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'option3',
          },
          {
            label: 'Option 4',
            key: 'option4',
          },
        ],
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

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{
    width: '100vh',
    backgroundColor: 'darkgray',
    borderRadius: '10px',
  }} />;
};

export default CustomerNavigation;