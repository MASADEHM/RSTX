import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const { Title, Paragraph } = Typography;

const HeroSlider: React.FC = () => {
    const navigate = useNavigate();

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Welcome to PCFC Company Setup',
            description: 'Your gateway to establishing a successful business in Dubai\'s thriving free zone',
            buttonText: 'Start Company Setup',
            buttonLink: '/company-setup'
        },
        {
            image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Business Growth Opportunities',
            description: 'Access world-class facilities and a business-friendly environment',
            buttonText: 'Learn More',
            buttonLink: '/about'
        },
        {
            image: 'https://images.unsplash.com/photo-1581092160607-ee284c4d0384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Expert Support & Guidance',
            description: 'Get comprehensive assistance throughout your business setup journey',
            buttonText: 'Contact Us',
            buttonLink: '/contact'
        }
    ];

    return (
        <div style={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginBottom: '2rem'
        }}>
            <Carousel autoplay>
                {slides.map((slide, index) => (
                    <div key={index}>
                        <div 
                            className="hero-slide"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '600px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'white'
                            }}
                        >
                            <div className="hero-content">
                                <Title level={1} style={{ color: 'white', marginBottom: '1rem' }}>
                                    {slide.title}
                                </Title>
                                <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    {slide.description}
                                </Paragraph>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    onClick={() => navigate(slide.buttonLink)}
                                >
                                    {slide.buttonText}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSlider; 