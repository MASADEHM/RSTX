import React from 'react';
import { Row, Col, Typography, Card, Statistic, Timeline } from 'antd';
import { 
    GlobalOutlined, 
    TeamOutlined, 
    TrophyOutlined, 
    SafetyOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
    const stats = [
        { title: 'Years of Experience', value: '25+', icon: <ClockCircleOutlined /> },
        { title: 'Companies Established', value: '10,000+', icon: <TeamOutlined /> },
        { title: 'Global Presence', value: '50+', icon: <GlobalOutlined /> },
        { title: 'Success Rate', value: '98%', icon: <TrophyOutlined /> }
    ];

    const milestones = [
        {
            year: '1998',
            title: 'Foundation',
            description: 'PCFC was established as a key player in Dubai\'s business landscape'
        },
        {
            year: '2005',
            title: 'Expansion',
            description: 'Launched comprehensive business setup services'
        },
        {
            year: '2010',
            title: 'Innovation',
            description: 'Introduced digital services for business registration'
        },
        {
            year: '2015',
            title: 'Global Recognition',
            description: 'Received international recognition for business excellence'
        },
        {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Launched fully digital business setup platform'
        },
        {
            year: '2023',
            title: 'Future Ready',
            description: 'Expanding services to support emerging business sectors'
        }
    ];

    const services = [
        {
            title: 'Business Setup',
            description: 'Comprehensive assistance in establishing your business in Dubai\'s free zones',
            icon: <CheckCircleOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Legal Support',
            description: 'Expert guidance on regulatory compliance and legal requirements',
            icon: <SafetyOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Business Advisory',
            description: 'Strategic consulting for business growth and market entry',
            icon: <TeamOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        },
        {
            title: 'Global Expansion',
            description: 'Support for international businesses looking to establish in Dubai',
            icon: <GlobalOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
        }
    ];

    return (
        <div className="centered-container" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <div className="page-title mb-5" >
                <Title level={1}>About PCFC</Title>
                <Paragraph className="lead" style={{ fontSize: '1.2rem' }}>
                    Your trusted partner in establishing and growing your business in Dubai's thriving free zone
                </Paragraph>
            </div>

            {/* Company Overview */}
            <Row gutter={[24, 24]} className="mb-5">
                <Col xs={24} md={12}>
                    <Title level={2}>Our Story</Title>
                    <Paragraph>
                        PCFC (Ports, Customs and Free Zone Corporation) has been at the forefront of Dubai's 
                        business landscape for over two decades. We have played a pivotal role in transforming 
                        Dubai into a global business hub, facilitating thousands of successful business setups 
                        and contributing to the emirate's economic growth.
                    </Paragraph>
                    <Paragraph>
                        Our commitment to excellence, innovation, and customer service has made us the preferred 
                        choice for businesses looking to establish their presence in Dubai's free zones. We 
                        understand the unique challenges and opportunities of the region and provide tailored 
                        solutions to help businesses thrive.
                    </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                    <Title level={2}>Our Mission</Title>
                    <Paragraph>
                        To be the leading facilitator of business growth in Dubai, providing innovative and 
                        comprehensive solutions that enable businesses to establish, operate, and expand 
                        successfully in the region.
                    </Paragraph>
                    <Title level={2}>Our Vision</Title>
                    <Paragraph>
                        To be the global benchmark for business setup services, driving economic growth and 
                        fostering international business relationships in Dubai.
                    </Paragraph>
                </Col>
            </Row>

            {/* Statistics */}
            <Row gutter={[24, 24]} className="mb-5">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Services */}
            <Title level={2} className="text-center mb-4">Our Services</Title>
            <Row gutter={[24, 24]} className="mb-5">
                {services.map((service, index) => (
                    <Col xs={24} md={6} key={index}>
                        <Card className="h-100">
                            <div className="text-center mb-3">
                                {service.icon}
                            </div>
                            <Title level={4} className="text-center">{service.title}</Title>
                            <Paragraph className="text-center">
                                {service.description}
                            </Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Timeline */}
            <Title level={2} className="text-center mb-4">Our Journey</Title>
            <Row justify="center" className="mb-5">
                <Col xs={24} md={16}>
                    <Timeline
                        items={milestones.map(milestone => ({
                            children: (
                                <div>
                                    <Title level={4}>{milestone.year}</Title>
                                    <Title level={5}>{milestone.title}</Title>
                                    <Paragraph>{milestone.description}</Paragraph>
                                </div>
                            )
                        }))}
                    />
                </Col>
            </Row>

            {/* Why Choose Us */}
            <Card className="mb-5">
                <Title level={2} className="text-center mb-4">Why Choose PCFC?</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                        <Title level={4}>Expertise</Title>
                        <Paragraph>
                            With over 25 years of experience, we have the knowledge and expertise to guide 
                            you through every step of your business setup journey.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={4}>Innovation</Title>
                        <Paragraph>
                            We continuously innovate our services and processes to provide the most efficient 
                            and effective solutions for our clients.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={4}>Support</Title>
                        <Paragraph>
                            Our dedicated team provides comprehensive support throughout your business journey, 
                            ensuring your success in Dubai's competitive market.
                        </Paragraph>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default About;