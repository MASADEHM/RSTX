import React from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactUs: React.FC = () => {
    const [form] = Form.useForm();

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 25.2048, // PCFC coordinates
        lng: 55.2708
    };

    const handleSubmit = (values: any) => {
        console.log('Form values:', values);
        message.success('Thank you for your message. We will get back to you soon!');
        form.resetFields();
    };

    return (
        <div>
            <Title level={2} className="text-center mb-4">Contact Us</Title>
            <Paragraph className="text-center mb-4" style={{ maxWidth: 700, margin: '0 auto' }}>
                We value your interest in PCFC Company Setup. Whether you have questions about our services, need support, or want to discuss your business goals, our team is here to help. Please fill out the form below or use the provided contact details to reach out to us. We look forward to connecting with you!
            </Paragraph>
            
            <Row gutter={[24, 24]}>
                {/* Contact Information */}
                <Col xs={24} md={8}>
                    <Card className="h-100">
                        <Title level={4}>Get in Touch</Title>
                        <Paragraph>
                            We're here to help you with your business setup journey. 
                            Feel free to reach out to us through any of the following channels.
                        </Paragraph>
                        
                        <div className="mb-4">
                            <EnvironmentOutlined style={{ fontSize: '1.5rem', color: '#1890ff', marginRight: 8 }} />
                            <strong>Address:</strong>
                            <Paragraph>
                                Ports, Customs and Free Zone Corporation<br />
                                Dubai, United Arab Emirates
                            </Paragraph>
                        </div>

                        <div className="mb-4">
                            <PhoneOutlined style={{ fontSize: '1.5rem', color: '#1890ff', marginRight: 8 }} />
                            <strong>Phone:</strong>
                            <Paragraph>
                                +971 4 123 4567<br />
                                +971 4 123 4568
                            </Paragraph>
                        </div>

                        <div className="mb-4">
                            <MailOutlined style={{ fontSize: '1.5rem', color: '#1890ff', marginRight: 8 }} />
                            <strong>Email:</strong>
                            <Paragraph>
                                info@pcfc.ae<br />
                                support@pcfc.ae
                            </Paragraph>
                        </div>
                    </Card>
                </Col>

                {/* Contact Form */}
                <Col xs={24} md={8}>
                    <Card>
                        <Title level={4}>Send us a Message</Title>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>

                            <Form.Item
                                name="subject"
                                label="Subject"
                                rules={[{ required: true, message: 'Please enter a subject' }]}
                            >
                                <Input placeholder="Enter message subject" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                label="Message"
                                rules={[{ required: true, message: 'Please enter your message' }]}
                            >
                                <TextArea 
                                    rows={4} 
                                    placeholder="Enter your message"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* Google Map */}
                <Col xs={24} md={8}>
                    <Card>
                        <Title level={4}>Our Location</Title>
                        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={15}
                            >
                                <Marker position={center} />
                            </GoogleMap>
                        </LoadScript>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUs; 