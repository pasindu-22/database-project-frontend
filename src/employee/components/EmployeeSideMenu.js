import React, { useState } from 'react';
import { MergeCellsOutlined, MoneyCollectOutlined ,BankOutlined, LogoutOutlined, ProfileOutlined, BellOutlined, AppstoreOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const items = [
  {
    key: '/app/dashboard',
    label: 'Dashboard',
    type: 'group',
    children: [
      {
        key: '/app/home',
        label: 'Home',
        icon: <BankOutlined />,
      },
      {
        key: '/app/events',
        label: 'Events',
        icon: <BellOutlined />,
      },
      {
        key: '/app/transactions/new',
        label: 'Transaction',
        icon: <MoneyCollectOutlined />,
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
    key: '/customers/',
    label: 'Customers',
    icon: <ProfileOutlined />,
    children: [
      {
        key: '/customers/new',
        label: 'New Customer',
        icon: <UserAddOutlined />,
      },
      {
        key: '/customers/search',
        label: 'Existing Customer',
        icon: <MergeCellsOutlined />,
      },
    ],
  },
  {
    key: '/app/loans',
    label: 'Loans',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '/app/loans/individual',
        label: 'Individual',
      },
      {
        key: '/app/loans/business',
        label: 'Business',
      },
    ],
  },
  {
    type: 'divider',
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

const EmployeeSideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
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
          logout();
        },
      });
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
        backgroundColor: 'whitesmoke',
        borderRadius: '15px 15px 15px 15px',
        background: 'linear-gradient(25deg, rgba(248, 248, 248, 1), rgba(150, 216, 230, 1))',
        borderColor: '#fafafa',
      }}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
    />
  );
};

export default EmployeeSideMenu;