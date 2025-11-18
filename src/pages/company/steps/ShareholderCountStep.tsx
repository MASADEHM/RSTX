import React, { useEffect } from 'react';
import { Form, InputNumber, Button, Card } from 'antd';
import { CompanySetupData } from '../../../interfaces/company.interface';
import { useAppSelector } from '../../../store/hooks';
import { selectStepData } from '../../../store/slices/companySetupSlice';

interface ShareholderCountStepProps {
    data: CompanySetupData;
    onNext: (count: number) => void;
    onBack: () => void;
}

const ShareholderCountStep: React.FC<ShareholderCountStepProps> = ({ onNext, onBack }) => {
    const [form] = Form.useForm();
    const stepData = useAppSelector(state => selectStepData(state, 1)); // Assuming this is step 1

    const handleSubmit = (values: { count: number }) => {
        onNext(values.count);
    };
   
    useEffect(() => {
        if (stepData?.numberOfShareholders) {
            form.setFieldsValue({ count: stepData.numberOfShareholders });
        }
    }, [stepData, form]);

    return (
        <Card title="Number of Shareholders" className="mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ count: 1 }}
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