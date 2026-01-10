import React, { useState } from "react";
import { Form, Input, Button, Card, Checkbox, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/store";
import tokenService from "@/services/token.service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ILoginRequest } from "@/interfaces/login.interface";
import { Loginservice } from "@/services/login.service";
const { Title } = Typography;

const Login: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = tokenService.LoggedIn();
  const { redirect } = useParams();

  const handleSubmit = async (values: ILoginRequest) => {
    setLoading(true);
    console.log(["redirect", redirect]);
    try {
      const response = await Loginservice.login(values);
      if (response.accessToken) {
        console.log("response", response);
        
        Loginservice.setToken(response.accessToken); 
        navigate(redirect ? `/${redirect}` : "/requests", {
          replace: true,
        });
        // Show success message
      }
    } catch (error: any) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <Title level={1}>Sign In to Your Account</Title>
        <p className="lead" style={{ fontSize: "1.2rem" }}>
          Access your personalized dashboard and manage your business setup with
          ease.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-9 col-md-7 col-lg-5">
          <Card className="shadow-sm">
            <div className="text-center mb-4">
              <Title level={2}>Sign In</Title>
              <p className="text-muted">
                Welcome back! Please login to your account.
              </p>
            </div>

            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Button
                    type="link"
                    onClick={() => navigate("/forgot-password")}
                    style={{ padding: 0 }}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoading}
                >
                  Sign in
                </Button>
              </Form.Item>
              <div className="text-center">
                Don't have an account?{" "}
                <a href="#" onClick={() => navigate("/signup")}>
                  Sign up
                </a>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
