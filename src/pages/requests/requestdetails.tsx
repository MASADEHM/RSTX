import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceLayout from '../../shared/ServiceLayout';
const { Title, Paragraph } = Typography;

// Mock data for demonstration
const requestDetailsData: any = {
  'REQ-1001': {
    requestNo: 'REQ-1001',
    type: 'Company Setup',
    status: 'Pending',
    date: '2024-06-01',
    description: 'Setting up a new company in Dubai Free Zone.'
  },
  'REQ-1002': {
    requestNo: 'REQ-1002',
    type: 'License Renewal',
    status: 'Approved',
    date: '2024-05-28',
    description: 'Renewal of business license.'
  },
  'REQ-1003': {
    requestNo: 'REQ-1003',
    type: 'Document Update',
    status: 'Rejected',
    date: '2024-05-20',
    description: 'Update of company documents.'
  },
  'REQ-1004': {
    requestNo: 'REQ-1004',
    type: 'Company Setup',
    status: 'In Review',
    date: '2024-05-15',
    description: 'Setting up a new company in Dubai Free Zone.'
  },
};

const RequestDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const details = requestDetailsData[id as
    
    string];

  if (!details) {
    return <Paragraph>Request not found.</Paragraph>;
  }

  let color = 'default';
  if (details.status === 'Approved') color = 'green';
  else if (details.status === 'Pending') color = 'orange';
  else if (details.status === 'Rejected') color = 'red';
  else if (details.status === 'In Review') color = 'blue';

  return (
    <ServiceLayout>
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Card bordered>
        <Title level={3}>Request Details</Title>
        <Paragraph><strong>Request No.:</strong> {details.requestNo}</Paragraph>
        <Paragraph><strong>Type:</strong> {details.type}</Paragraph>
        <Paragraph><strong>Status:</strong> <Tag color={color}>{details.status}</Tag></Paragraph>
        <Paragraph><strong>Date:</strong> {details.date}</Paragraph>
        <Paragraph><strong>Description:</strong> {details.description}</Paragraph>
        <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>Back</Button>
      </Card>
    </div>
    </ServiceLayout>
  );
};

export default RequestDetails; 