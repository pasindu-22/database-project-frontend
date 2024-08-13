import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Accounts',
    key: '/customers/accounts/details',
    icon: <MailOutlined />,
  },
  {
    label: 'Profile',
    key: '/customers/profile/details',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  {
    label: 'Transactions',
    key: '/transactions/',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: '/transactions/option1',
          },
          {
            label: 'Option 2',
            key: '/transactions/option2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: '/transactions/option3',
          },
          {
            label: 'Option 4',
            key: '/transactions/option4',
          },
        ],
      },
    ],
  },
  {
    label: 'System Logs',
    key: '/customers/logs/',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
];

const CustomerNavigation = () => {
  const [current, setCurrent] = useState('/accounts');
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key); // Navigate to the route specified in the key
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default CustomerNavigation;
