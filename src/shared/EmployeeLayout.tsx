import React, { useState } from 'react';
import { Layout } from 'antd';
import EmployeeSidebar from './EmployeeSidebar';

const { Content } = Layout;

const EmployeeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <EmployeeSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Content style={{ padding: '2rem', width: '100%' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout; 