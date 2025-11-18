import React, { useEffect } from 'react';
import { Form, Select, Button, Card } from 'antd';
import { BusinessCategory, CompanySetupData } from '../../../interfaces/company.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface BusinessCategoryStepProps {
    data: CompanySetupData;
    onNext: (category: BusinessCategory) => void;
    onBack?: (category: BusinessCategory) => void;
}

const businessCategories: BusinessCategory[] = [
    { id: 1, name: 'Technology', description: 'Software, Hardware, IT Services' },
    { id: 2, name: 'Manufacturing', description: 'Production and Manufacturing' },
    { id: 3, name: 'Retail', description: 'Consumer Goods and Services' },
    { id: 4, name: 'Healthcare', description: 'Medical and Health Services' },
    { id: 5, name: 'Finance', description: 'Banking and Financial Services' }
];

const BusinessCategoryStep: React.FC<BusinessCategoryStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();
    const quickEstimate = useSelector((state: RootState) => state.companySetup.quickEstimate);

    useEffect(() => {
        if (data.businessCategory?.id) {
            form.setFieldsValue({ category: data.businessCategory.id });
        } else {
            form.setFieldsValue({ category: undefined });
        }
    }, [data.businessCategory, form]);

    useEffect(() => {
        if (quickEstimate) {
            form.setFieldsValue({ category: quickEstimate.businessCategory?.id });
        }
    }, [quickEstimate, form]);

    const handleSubmit = (values: { category: number }) => {
        const selectedCategory = businessCategories.find(cat => cat.id === values.category);
        if (selectedCategory) {
            onNext(selectedCategory);
        }
    };

    const handleBack = async () => {
        const values = await form.getFieldsValue();
        const selectedCategory = businessCategories.find(cat => cat.id === values.category);
        if (selectedCategory && onBack) {
            onBack(selectedCategory);
        }
    };

    return (
        <Card title="Select Business Category" className="mb-4" variant='outlined' >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ category: data.businessCategory?.id && data.businessCategory.id > 0 ? data.businessCategory.id : undefined }}
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
                        disabled={!!quickEstimate}
                    />
                </Form.Item>

                <Form.Item>
                    {onBack && (
                        <Button type="default" onClick={handleBack} style={{ marginRight: 8 }}>
                            Back
                        </Button>
                    )}
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default BusinessCategoryStep; 