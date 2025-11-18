import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  FileExclamationOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const [localCollapsed, setLocalCollapsed] = useState(false);

  const handleCollapse = (value: boolean) => {
    setLocalCollapsed(value);
    onCollapse?.(value);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed ?? localCollapsed}
      onCollapse={handleCollapse}
      breakpoint="md"
      collapsedWidth={80}
      width={240}
      theme="light"
      style={{ background: '#fff', minHeight: '100vh', borderRight: '1px solid #f0f0f0' }}
    >
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>
        {collapsed ?? localCollapsed ? 'Menu' : 'Main Menu'}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['license']}
        style={{ height: 'calc(100% - 64px)', borderRight: 0 }}
      >
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/payment" icon={<CreditCardOutlined />}>
          <Link to="/payment" style={{ textDecoration: 'none' }}>Payment</Link>
        </Menu.Item>
        <Menu.SubMenu key="license" icon={<FileTextOutlined />} title="License Services">
          <Menu.Item key="/license/renewal" icon={<FileSyncOutlined />}>
            <Link to="/license/renewal" style={{ textDecoration: 'none' }}>Renewal</Link>
          </Menu.Item>
          <Menu.Item key="/license/cancellation" icon={<FileExclamationOutlined />}>
            <Link to="/license/cancellation" style={{ textDecoration: 'none' }}>Cancellation</Link>
          </Menu.Item>
          <Menu.Item key="/license/letters" icon={<FileTextOutlined />}>
            <Link to="/license/letters" style={{ textDecoration: 'none' }}>Letters</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="/requests" icon={<FileTextOutlined />}>
          <Link to="/requests" style={{ textDecoration: 'none' }}>Requests</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar; 