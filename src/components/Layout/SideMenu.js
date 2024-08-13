import React from 'react';
import { BankOutlined,LogoutOutlined, PieChartOutlined, ProfileOutlined, BellOutlined, AppstoreOutlined, GroupOutlined, UserAddOutlined, SettingOutlined, AlertOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    ],
  },
  {
    key: '/app/reports',
    label: 'Reports',
    icon: <PieChartOutlined />,
    children: [
      {
        key: '/app/reports/transactions',
        label: 'Total Transactions Report',
      },
      {
        key: '/app/reports/lateloans',
        label: 'Late Loans Report',
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
        key: '/customers/individual/',
        label: 'Individual',
        type: 'group',
        children: [
          {
            key: '/customers/individual/new',
            label: 'New Customer',
          },
          {
            key: '/customers/individual/existing',
            label: 'Existing Customer',
          },
        ],
      },
      {
        key: '/customers/business',
        label: 'Business',
        icon: <GroupOutlined />,
        type: 'group',
        children: [
          {
            key: '/customers/business/new',
            label: 'New Customer',
          },
          {
            key: '/customers/business/existing',
            label: 'Existing Customer',
          },
        ],
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
      {
        key: '/app/loans/submenu',
        label: 'Submenu',
        children: [
          {
            key: '/app/loans/option7',
            label: 'Option 7',
          },
          {
            key: '/app/loans/option8',
            label: 'Option 8',
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: '/app/system-management',
    label: 'System Management',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/management/new/manager',
        label: 'New',
        icon: <UserAddOutlined />,
        children: [
          {
            key: '/management/new/manager',
            label: 'Manager',
          },
          {
            key: '/management/new/branch',
            label: 'Branch',
          },
        ],
      },
      {
        key: '/app/system-management/employee',
        label: 'Employee Management',
        icon: <ToolOutlined />,
      },
      {
        key: '/app/system-management/teams',
        label: 'Teams',
        icon: <TeamOutlined />,
      },
      {
        key: '/app/system-management/logs',
        label: 'System Logs',
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

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['/app/home']}
      defaultOpenKeys={['/app/dashboard']}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;