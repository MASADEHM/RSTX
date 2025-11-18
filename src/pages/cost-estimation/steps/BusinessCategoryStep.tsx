import React from 'react';
import { Form, Select, Button, Card } from 'antd';
import { BusinessCategory } from '../../../interfaces/company.interface';
import { CostEstimationStepProps } from '../../../interfaces/costEstimation.interface';

const businessCategories: BusinessCategory[] = [
    { id: 1, name: 'Technology', description: 'Software, Hardware, IT Services' },
    { id: 2, name: 'Manufacturing', description: 'Production and Manufacturing' },
    { id: 3, name: 'Retail', description: 'Consumer Goods and Services' },
    { id: 4, name: 'Healthcare', description: 'Medical and Health Services' },
    { id: 5, name: 'Finance', description: 'Banking and Financial Services' }
];

const BusinessCategoryStep: React.FC<CostEstimationStepProps> = ({ data, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { category: number }) => {
        const selectedCategory = businessCategories.find(cat => cat.id === values.category);
        if (selectedCategory) {
            onNext?.({ businessCategory: selectedCategory });
        }
    };

    return (
        <Card title="Select Business Category" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ category: data.businessCategory?.id }}
            >
                <Form.Item
                    name="category"
                    label="Business Category"
                    rules={[{ required: true, message: 'Please select a business category' }]}
                >
                    <Select
                        placeholder="Select a business category"
                        options={businessCategories.map(category => ({
                            value: category.id,
                            label: category.name,
                            description: category.description
                        }))}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default BusinessCategoryStep; 