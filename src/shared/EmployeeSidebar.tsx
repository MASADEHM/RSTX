import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  // Add more icons as needed for employee functions
  FolderOpenOutlined,
  BarChartOutlined,
  SettingOutlined,
  TransactionOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;
interface EmployeeSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();

  // Define menu items for employees
  const menuItems = [
    {
      key: '/employee',
      icon: <DashboardOutlined />,
      label: <Link to="/employee" style={{ textDecoration: 'none' }}>Dashboard</Link>,
    },
    {
      key: 'requests-review',
      icon: <FolderOpenOutlined />,
      label: 'Requests Review',
      children: [
        { key: '/employee/requests/pending', label: <Link to="/employee/requests/pending" style={{ textDecoration: 'none' }}>Pending</Link> },
        { key: '/employee/requests/approved', label: <Link to="/employee/requests/approved" style={{ textDecoration: 'none' }}>Approved</Link> },
        { key: '/employee/requests/rejected', label: <Link to="/employee/requests/rejected" style={{ textDecoration: 'none' }}>Rejected</Link> },
      ],
    },
    {
      key: '/employee/transactions',
      icon: <TransactionOutlined />,
      label: <Link to="/employee/transactions" style={{ textDecoration: 'none' }}>Transactions</Link>,
    },
    {
      key: '/employee/clients',
      icon: <UsergroupAddOutlined />,
      label: <Link to="/employee/clients" style={{ textDecoration: 'none' }}>Client Registration</Link>,
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      children: [
        { key: '/employee/reports/daily', label: <Link to="/employee/reports/daily" style={{ textDecoration: 'none' }}>Daily Reports</Link> },
        { key: '/employee/reports/monthly', label: <Link to="/employee/reports/monthly" style={{ textDecoration: 'none' }}>Monthly Reports</Link> },
      ],
    },
    {
      key: 'masters',
      icon: <SettingOutlined />,
      label: 'Masters',
      children: [
        { key: '/employee/masters/tradename', label: <Link to="/employee/masters/tradename" style={{ textDecoration: 'none' }}>Trade Name</Link> },
        { key: '/employee/masters/services', label: <Link to="/employee/masters/services" style={{ textDecoration: 'none' }}>Services</Link> },
      ],
    },
  ];

  // Determine open keys for submenus based on current path
  const getOpenKeys = (path: string) => {
    if (path.startsWith('/employee/requests')) return ['requests-review'];
    if (path.startsWith('/employee/reports')) return ['reports'];
    if (path.startsWith('/employee/masters')) return ['masters'];
    return [];
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth={80}
      width={240}
      theme="light"
      style={{ background: '#fff', minHeight: '100vh', borderRight: '1px solid #f0f0f0' }}
    >
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>
        {collapsed ? 'Admin' : 'Admin Panel'}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={getOpenKeys(location.pathname)}
        style={{ height: 'calc(100% - 64px)', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default EmployeeSidebar; 