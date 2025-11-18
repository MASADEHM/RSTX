import React, { useState } from "react";
import { Form, Input, Button, Card, Checkbox, Typography, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ILoginRequest } from "../interfaces/login.interface";
import { Loginservice } from "../services/login.service";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values: ILoginRequest) => {
        setLoading(true);
        try {
            // For now, we're using the mock login
            Loginservice.setToken("true");
            navigate('/requests', { replace: true });
            
            // Uncomment this when the API is ready
            // const response = await Loginservice.login(values);
            // if (response.data) {
            //     Loginservice.setToken("true");
            //     navigate('/users', { replace: true });
            // }
        } catch (error: any) {
            message.error(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <Title level={1}>Sign In to Your Account</Title>
                <p className="lead" style={{ fontSize: '1.2rem' }}>
                    Access your personalized dashboard and manage your business setup with ease.
                </p>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-9 col-md-7 col-lg-5">
                    <Card className="shadow-sm">
                        <div className="text-center mb-4">
                            <Title level={2}>Sign In</Title>
                            <p className="text-muted">Welcome back! Please login to your account.</p>
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
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
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
                                    { required: true, message: 'Please input your password!' },
                                    { min: 6, message: 'Password must be at least 6 characters!' }
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
                                    <a className="text-primary" href="#">
                                        Forgot password?
                                    </a>
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
                                Don't have an account? <a href="/signup">Sign up</a>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;