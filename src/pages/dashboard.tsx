import React from 'react';
import { Card, Row, Col, Typography, Statistic, Table } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ServiceLayout from '@/shared/ServiceLayout';

const { Title } = Typography;

// Mock data for requests status
const requestsStatusData = [
  { name: 'Pending', value: 2 },
  { name: 'Approved', value: 1 },
  { name: 'In Review', value: 1 },
  { name: 'Rejected', value: 0 },
];
const COLORS = ['#FFBB28', '#00C49F', '#0088FE', '#FF4D4F'];

// Mock data for pending payments
const pendingPayments = 2500; // AED

// Mock data for recent requests
const recentRequests = [
  {
    key: '1',
    requestNo: 'REQ-1004',
    type: 'Company Setup',
    status: 'In Review',
    date: '2024-05-15',
  },
  {
    key: '2',
    requestNo: 'REQ-1002',
    type: 'License Renewal',
    status: 'Approved',
    date: '2024-05-28',
  },
  {
    key: '3',
    requestNo: 'REQ-1001',
    type: 'Company Setup',
    status: 'Pending',
    date: '2024-06-01',
  },
];

const columns = [
  { title: 'Request No.', dataIndex: 'requestNo', key: 'requestNo' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const Dashboard: React.FC = () => {
  return (
    <ServiceLayout>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <Title level={2} style={{ marginBottom: 24 }}>User Dashboard</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Requests Status Distribution">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={requestsStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {requestsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Pending Payments" style={{ textAlign: 'center' }}>
            <Statistic
              value={pendingPayments}
              prefix="AED"
              valueStyle={{ color: '#faad14', fontWeight: 600 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Recent Requests">
            <Table
              columns={columns}
              dataSource={recentRequests}
              size="small"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
    </ServiceLayout>
  );
};

export default Dashboard; 