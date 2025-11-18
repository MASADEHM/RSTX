import React from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Typography,
  List,
  Button,
  Input,
  Space,
} from "antd";
import { Grid } from "antd";
import EmployeeLayout from "../../shared/EmployeeLayout"; // Import the new layout
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface RequestData {
  key: string;
  requestNo: string;
  type: string;
  status: string;
  submittedBy: string;
  date: string;
}

const stats = [
  { value: 36, label: "Online Review", color: "#16a34a" },
  { value: 228, label: "In Progress", color: "#06b6d4" },
  { value: 124, label: "DED Review", color: "#f59e0b" },
];

const data: RequestData[] = [
  {
    key: "emp-1",
    requestNo: "EMP-001",
    type: "Company Setup",
    status: "Pending",
    submittedBy: "Alice Smith",
    date: "2024-06-10",
  },
  {
    key: "emp-2",
    requestNo: "EMP-002",
    type: "License Renewal",
    status: "Approved",
    submittedBy: "Bob Johnson",
    date: "2024-06-08",
  },
  {
    key: "emp-3",
    requestNo: "EMP-003",
    type: "Document Update",
    status: "More Info Required",
    submittedBy: "Charlie Brown",
    date: "2024-06-05",
  },
  {
    key: "emp-4",
    requestNo: "EMP-004",
    type: "Company Setup",
    status: "In Review",
    submittedBy: "Diana Prince",
    date: "2024-06-03",
  },
]; // Replace with real data

const EmployeeLanding: React.FC = () => {
  const screens = useBreakpoint();
  const { t,ready } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [transactionSearchQuery, setTransactionSearchQuery] =
    React.useState<string>("");

  const handleView = (record: RequestData) => {
    navigate(`/employee/requests/${record.requestNo}`);
  };

  const columns = [
    { title: "Request No.", dataIndex: "requestNo", key: "requestNo" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Submitted By", dataIndex: "submittedBy", key: "submittedBy" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: RequestData) => (
        <Button type="link" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <EmployeeLayout>
      {!ready && <div>Loading...</div>}
      {" "}
      {/* Wrap with EmployeeLayout */}
      <div style={{ padding: "0 1rem" }}>
        {" "}
        {/* Removed maxWidth, keeping horizontal padding */}
        <Title level={2}>{`${t("employee_dashboard")}`}</Title>
        <p>{t('welcome_subtitle')}</p>
        <Space style={{ marginBottom: 24 }}>
          <Input
            placeholder="Enter Transaction Number"
            value={transactionSearchQuery}
            onChange={(e) => setTransactionSearchQuery(e.target.value)}
            style={{ width: 250 }}
          />
          <Button type="primary">Proceed</Button>
        </Space>
        <Row gutter={24} style={{ marginBottom: 32 }}>
          {stats.map((stat) => (
            <Col xs={24} md={8} key={stat.label}>
              <Card
                style={{
                  background: stat.color,
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "1.1rem" }}>{stat.label}</div>
              </Card>
            </Col>
          ))}
        </Row>
        <Card title="Requests Needing Action">
          {screens.md ? (
            // Desktop/Tablet view: Table
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              locale={{ emptyText: "No requests to review yet." }}
              scroll={{ x: "max-content" }}
            />
          ) : (
            // Mobile view: List
            <List
              itemLayout="vertical"
              dataSource={data}
              locale={{ emptyText: "No requests to review yet." }}
              renderItem={(item) => (
                <List.Item
                  key={item.key}
                  actions={[
                    <Button type="link" onClick={() => handleView(item)}>
                      View
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={<span>Request No.: {item.requestNo}</span>}
                    description={
                      <>
                        <p>
                          <strong>Type:</strong> {item.type}
                        </p>
                        <p>
                          <strong>Status:</strong> {item.status}
                        </p>
                        <p>
                          <strong>Submitted By:</strong> {item.submittedBy}
                        </p>
                        <p>
                          <strong>Date:</strong> {item.date}
                        </p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeLanding;
