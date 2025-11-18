import React from 'react';
import { Form, Radio, Button, Card } from 'antd';
import { CostEstimationStepProps } from '../../../interfaces/costEstimation.interface';

const TradeNameStep: React.FC<CostEstimationStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { hasTradeName: boolean }) => {
        onNext?.({ hasTradeName: values.hasTradeName });
    };

    return (
        <Card title="Trade Name" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ hasTradeName: data.hasTradeName }}
            >
                <Form.Item
                    name="hasTradeName"
                    label="Do you have a trade name?"
                    rules={[{ required: true, message: 'Please select an option' }]}
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
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

export default TradeNameStep; 