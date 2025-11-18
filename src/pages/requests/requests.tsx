import React from 'react';
import { Table, Tag, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ServiceLayout from '../../shared/ServiceLayout';

const { Title } = Typography;

const requestData = [
  {
    key: '1',
    requestNo: 'REQ-1001',
    type: 'Company Setup',
    status: 'Pending',
    date: '2024-06-01',
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
    requestNo: 'REQ-1003',
    type: 'Document Update',
    status: 'Rejected',
    date: '2024-05-20',
  },
  {
    key: '4',
    requestNo: 'REQ-1004',
    type: 'Company Setup',
    status: 'In Review',
    date: '2024-05-15',
  },
];

const Requests: React.FC = () => {
  const navigate = useNavigate();
  const handleView = (record: any) => {
    navigate(`/requests/${record.requestNo}`);
  };

  const columns = [
    {
      title: 'Request No.',
      dataIndex: 'requestNo',
      key: 'requestNo',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'Approved') color = 'green';
        else if (status === 'Pending') color = 'orange';
        else if (status === 'Rejected') color = 'red';
        else if (status === 'In Review') color = 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <ServiceLayout>
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
      <Title level={2} style={{ marginBottom: 24 }}>My Requests</Title>
      <Table columns={columns} dataSource={requestData} pagination={{ pageSize: 8 }} bordered />
    </div>
    </ServiceLayout>
  );
};

export default Requests; 