import React from 'react';
import { Form, InputNumber, Button, Card } from 'antd';
import { CostEstimationStepProps } from '../../../interfaces/costEstimation.interface';

const ActivityCountStep: React.FC<CostEstimationStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { count: number }) => {
        onNext?.({ numberOfActivities: values.count });
    };

    return (
        <Card title="Number of Activities" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ count: data.numberOfActivities }}
            >
                <Form.Item
                    name="count"
                    label="Number of Activities"
                    rules={[
                        { required: true, message: 'Please enter the number of activities' },
                        { type: 'number', min: 1, max: 10, message: 'Number must be between 1 and 10' }
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter number of activities"
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

export default ActivityCountStep; 