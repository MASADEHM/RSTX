import React from 'react';
import { Card, Button, Input, Space } from 'antd';

const ExampleComponent: React.FC = () => {
  return (
    <div className="p-6">
      {/* Using Tailwind classes with Ant Design components */}
      <Card className="custom-card hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gradient mb-4">
          Tailwind + Ant Design Example
        </h2>
        
        <Space direction="vertical" className="w-full">
          {/* Custom styled input using Tailwind */}
          <Input 
            className="custom-input"
            placeholder="Enter your text"
          />
          
          {/* Ant Design button with Tailwind classes */}
          <Button 
            type="primary"
            className="w-full hover:bg-blue-600"
          >
            Submit
          </Button>
          
          {/* Custom styled div with Tailwind */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              This is a custom styled container using Tailwind CSS
            </p>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ExampleComponent; 