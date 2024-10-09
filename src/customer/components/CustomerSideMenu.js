import React, { useState } from 'react';
import {  LogoutOutlined, PieChartOutlined, ProfileOutlined, AppstoreOutlined, GroupOutlined, UserAddOutlined, SettingOutlined, AlertOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Menu, Modal, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const items = [
    {
        key: '/customer/bank',
        label: 'The A Bank',
        Type: 'group'
    },
    {
          key: '/customer/home',
          label: 'Home',
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
        key: '/customer/transaction/view',
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
        key: '/customer/change/credentials',
        label: 'Change',
        icon: <UserAddOutlined />,
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

const SideMenu = ({ collapsed, toggleCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openKeys, setOpenKeys] = useState([]);
  // const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    console.log('click ', e);
    if (e.key === '/signout') {
      Modal.confirm({
        title: 'Confirm Logout',
        content: 'Are you sure you want to log out?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          logout();
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
    <div style={{ width: collapsed ? 80 : 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={onClick}
        style={{
          width: '100%',
          backgroundColor: 'rgba(224, 247, 250, 0.8)' ,
          borderRadius: '15px 15px 15px 15px',
          margin: '0px 0px 5px 5px',       
          height: '99.5%',
        }}
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SideMenu;