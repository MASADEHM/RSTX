import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Signup: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                message.success('Account created successfully!');
                navigate('/login');
            }, 1000);
        } catch (error: any) {
            message.error(error.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <Title level={1}>Create Your PCFC Account</Title>
                <p className="lead" style={{ fontSize: '1.2rem' }}>
                    Join PCFC Company Setup to access personalized business setup services, track your applications, and connect with our expert support team. Signing up is quick and easy—get started on your business journey today!
                </p>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-9 col-md-7 col-lg-5">
                    <Card className="shadow-sm">
                        <div className="text-center mb-4">
                            <Title level={2}>Sign Up</Title>
                            <p className="text-muted">Create your account to get started.</p>
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
                                rules={[{ required: true, message: 'Please enter your full name' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please enter your password' },
                                    { min: 6, message: 'Password must be at least 6 characters' }
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone Number (optional)"
                                rules={[
                                    { pattern: /^\+?\d{7,15}$/, message: 'Please enter a valid phone number' }
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={isLoading}
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>
                            <div className="text-center">
                                Already have an account? <a href="/login">Sign in</a>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Signup; 