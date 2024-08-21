import React, { useState } from 'react';
import { BankOutlined, LogoutOutlined, PieChartOutlined, ProfileOutlined, BellOutlined, AppstoreOutlined, GroupOutlined, UserAddOutlined, SettingOutlined, AlertOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
    {
        key: '/customer/bank',
        label: 'The A Bank',
        Type: 'group'
    },
    {
          key: '/customer/dashboard',
          label: 'Dashboard',
          icon: <GroupOutlined />,
          
    },
    {
        key: '/customer/transaction/new',
        label: 'New Transaction',
        icon: <ProfileOutlined />,
        
    },
    {
    type: 'divider',
    style: {
      margin: '16px 0',
      thickness: '2px',
    },
  },
  {
    key: '/customer/accounts',
    label: 'Account Management',
    icon: <PieChartOutlined />,
    children: [
      {
        key: '/customer/accounts/fd/new',
        label: 'New Fixed Deposit',
      },
      {
        key: '/customer/accounts/view',
        label: 'View Accounts',
      },
      {
        key: '/app/accounts/view/transactions',
        label: 'View Transactions',
      },
    ],
  },
  {
    type: 'divider',
    style: {
      margin: '16px 0',
      thickness: '2px',
    },
  },
  {
    key: '/customer/loan/',
    label: 'Loan Management',
    icon: <ProfileOutlined />,
    children: [
      {
        key: '/customer/loan/new',
        label: 'New Online Loan',
        icon: <UserAddOutlined />,
      },
      {
        key: '/customer/loan/view',
        label: 'View My Loans',
        icon: <AppstoreOutlined />,
        children: [
          {
            key: '/customer/loan/view/pending',
            label: 'Pending',
          },
          {
            key: '/customer/loan/view/ongoing',
            label: 'Ongoing',
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '/customer/access-management',
    label: 'Access Management',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/customer/change/',
        label: 'Change',
        icon: <UserAddOutlined />,
        children: [
          {
            key: '/customer/change/password',
            label: 'My Password',
            icon: <ToolOutlined />,
          },
          {
            key: '/customer/change/username',
            label: 'My Username',
            icon: <TeamOutlined />,
          },
        ],
      },
      {
        key: '/app/system-management/logs',
        label: 'Login Activities',
        icon: <AlertOutlined />,
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '/signout',
    label: 'Sign Out',
    icon: <LogoutOutlined />,
  },
];

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  const onClick = (e) => {
    console.log('click ', e);
    if (e.key === '/signout') {
      Modal.confirm({
        title: 'Confirm Logout',
        content: 'Are you sure you want to log out?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          localStorage.removeItem('role'); // Clear the role from localStorage
          navigate('/'); // Redirect to the role selection screen
        },
      });
    } else if (e.key === '/customers/individual/existing' || e.key === '/customers/business/existing') {
      navigate('/customers/search'); // Navigate to the search page
    } else {
      navigate(e.key); // Use navigate to change the route
    }
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (items.map(item => item.key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        backgroundColor: 'lightg',
        borderRadius: '15px 15px 15px 15px',
      }}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;