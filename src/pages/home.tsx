import React from 'react';
import { Card, Row, Col, Typography, Steps, List } from 'antd';
import { CheckCircleOutlined, BankOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import HeroSlider from '../shared/HeroSlider';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const Home: React.FC = () => {
    const licenseTypes = [
        {
            title: 'FZE (Free Zone Establishment)',
            description: 'Single shareholder company structure, ideal for individual entrepreneurs and small businesses.',
            features: [
                '100% foreign ownership',
                'Single shareholder',
                'Limited liability',
                'Tax exemption',
                'Full repatriation of profits'
            ]
        },
        {
            title: 'FZCO (Free Zone Company)',
            description: 'Multiple shareholder company structure, perfect for partnerships and larger businesses.',
            features: [
                '100% foreign ownership',
                'Multiple shareholders (2-50)',
                'Limited liability',
                'Tax exemption',
                'Full repatriation of profits'
            ]
        },
        {
            title: 'Business Center License',
            description: 'Flexible business setup option for companies looking to establish a presence in Dubai.',
            features: [
                'Virtual office solutions',
                'Business support services',
                'Flexible workspace options',
                'Access to business facilities',
                'Professional business address'
            ]
        }
    ];

    const benefits = [
        'Strategic location in Dubai',
        '100% foreign ownership',
        'Tax-free environment',
        'Full repatriation of profits',
        'Modern infrastructure',
        'Access to global markets',
        'Business-friendly regulations',
    ];

    return (
        <>
            <HeroSlider />

            <div style={{ maxWidth: 1200, margin: '0 auto', marginTop: 32 }}>
                {/* License Types */}
                <Title level={2} className="text-center mb-4">Choose Your License Type</Title>
                <Row gutter={[24, 24]} className="mb-5">
                    {licenseTypes.map((type, index) => (
                        <Col xs={24} md={8} key={index}>
                            <Card 
                                title={type.title}
                                className="h-100"
                                hoverable
                            >
                                <Paragraph>{type.description}</Paragraph>
                                <List
                                    dataSource={type.features}
                                    renderItem={item => (
                                        <List.Item>
                                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                                            {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Benefits Section */}
                <Card className="mb-5">
                    <Title level={2} className="text-center mb-4">Why Choose PCFC?</Title>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <List
                                dataSource={benefits}
                                renderItem={item => (
                                    <List.Item>
                                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <div className="p-4 bg-light rounded">
                                <Title level={4}>Quick Setup Process</Title>
                                <Steps direction="vertical" current={-1}>
                                    <Step title="Choose License Type" description="Select the most suitable license for your business" />
                                    <Step title="Submit Documents" description="Provide required documentation" />
                                    <Step title="Pay Fees" description="Complete payment for license and services" />
                                    <Step title="Start Operations" description="Begin your business activities" />
                                </Steps>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Features Section */}
                <Row gutter={[24, 24]} className="mb-5">
                    <Col xs={24} md={8}>
                        <Card>
                            <BankOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Business Support</Title>
                            <Paragraph>
                                Comprehensive business support services including banking, legal, and administrative assistance.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card>
                            <TeamOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Networking</Title>
                            <Paragraph>
                                Access to a vibrant business community and networking opportunities with other companies.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card>
                            <GlobalOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
                            <Title level={4}>Global Reach</Title>
                            <Paragraph>
                                Strategic location providing easy access to markets in the Middle East, Africa, and Asia.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Home;