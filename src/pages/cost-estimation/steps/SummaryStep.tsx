import React from 'react';
import { Card, Button, Descriptions, Typography, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CostEstimationStepProps } from '../../../interfaces/costEstimation.interface';
import { useAppDispatch } from '../../../store';
import { updateStepData } from '../../../store/slices/companySetupSlice';

const { Title } = Typography;

const SummaryStep: React.FC<CostEstimationStepProps> = ({ data, onBack }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleContinue = () => {
        Modal.info({
            title: 'Complete Business setup',
            content: 'You will be redirected to complete your business setup. Your selections will be pre-filled.',
            okText: 'Go to Business Setup',
            onOk: () => {
                console.log(data)
                dispatch(updateStepData({
                    step: 1,
                    data: data,
                    isValid: true
                }));
                navigate('/company-setup');
            },
        });
    };

    return (
        <Card title="Cost Summary" className="mb-4">
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Business Category">
                    {data.businessCategory?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Activities">
                    {data.numberOfActivities}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Shareholders">
                    {data.numberOfShareholders}
                </Descriptions.Item>
                <Descriptions.Item label="Trade Name">
                    {data.hasTradeName ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Business Location">
                    {data.businessLocation}
                </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
                <Title level={4}>Cost Breakdown</Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Base Cost">
                        {formatCurrency(data.costs.baseCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Activity Cost">
                        {formatCurrency(data.costs.activityCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shareholder Cost">
                        {formatCurrency(data.costs.shareholderCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trade Name Cost">
                        {formatCurrency(data.costs.tradeNameCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Location Cost">
                        {formatCurrency(data.costs.locationCost)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Cost" className="font-bold">
                        {formatCurrency(data.costs.totalCost)}
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <div style={{ marginTop: '1rem' }} className="summary-actions">
                <Button type="default" onClick={onBack} style={{ marginRight: 8 }}>
                    Back
                </Button>
                <Button type="primary" onClick={() => window.print()} style={{ marginRight: 8 }}>
                    Print Estimate
                </Button>
                <Button type="primary" onClick={handleContinue}>
                    Continue Business Setup
                </Button>
            </div>
        </Card>
    );
};

export default SummaryStep; 