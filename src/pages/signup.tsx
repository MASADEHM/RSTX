import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Row, Col } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Signup: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        message.success("Account created successfully!");
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      message.error(error.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px 24px",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Row justify="center">
        <Col span={24} style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title level={1}>Create Your PCFC Account</Title>
         
          <Paragraph             style={{
              fontSize: "1.2rem",
              color: "#666",
            
            }}>
            Join PCFC to access personalized business setup services and expert
            support. Get started on your business journey today!
          </Paragraph>
        </Col>
      </Row>
     
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              borderRadius: "24px",
              border: "1px solid #f0f0f0",
              padding: "32px",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
              width: "100%",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title level={2}>Sign Up</Title>
              <Paragraph style={{ color: "#666" }}>
                Create your account to get started.
              </Paragraph>
            </div>
            <Form
              form={form}
              name="signup"
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Full Name"
                  size="large"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #d9d9d9",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #d9d9d9",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #d9d9d9",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                  size="large"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #d9d9d9",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number (optional)"
                rules={[
                  {
                    pattern: /^\+?\d{7,15}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Phone Number"
                  size="large"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #d9d9d9",
                    padding: "12px 16px",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoading}
                  style={{
                    borderRadius: "12px",
                    height: "48px",
                    fontSize: "16px",
                    fontWeight: "600",
                    background: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Paragraph>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#1890ff" }}>
                    Sign in
                  </Link>
                </Paragraph>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
