import React from 'react';
import { Form, InputNumber, Button, Card } from 'antd';
import { CostEstimationStepProps } from '../../../interfaces/costEstimation.interface';

const ShareholderCountStep: React.FC<CostEstimationStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { count: number }) => {
        onNext?.({ numberOfShareholders: values.count });
    };

    return (
        <Card title="Number of Shareholders" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ count: data.numberOfShareholders }}
            >
                <Form.Item
                    name="count"
                    label="Number of Shareholders"
                    rules={[
                        { required: true, message: 'Please enter the number of shareholders' },
                        { type: 'number', min: 1, max: 10, message: 'Number must be between 1 and 10' }
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter number of shareholders"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="default" onClick={onBack} style={{ marginRight: 8 }}>
                        Back
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ShareholderCountStep; 