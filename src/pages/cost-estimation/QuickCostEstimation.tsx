import React, { useState } from "react";
import { Steps, Row, Col, Card, Typography } from "antd";
import { CostEstimationData } from "../../interfaces/costEstimation.interface";
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import ActivityCountStep from "./steps/ActivityCountStep";
import ShareholderCountStep from "./steps/ShareholderCountStep";
import TradeNameStep from "./steps/TradeNameStep";
import BusinessLocationStep from "./steps/BusinessLocationStep";
import SummaryStep from "./steps/SummaryStep";

const { Title, Paragraph } = Typography;

const QuickCostEstimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimationData, setEstimationData] = useState<CostEstimationData>({
    businessCategory: null,
    numberOfActivities: 0,
    numberOfShareholders: 0,
    hasTradeName: false,
    businessLocation: '',
    costs: {
      baseCost: 5000, // Base cost for any setup
      activityCost: 0,
      shareholderCost: 0,
      tradeNameCost: 0,
      locationCost: 0,
      totalCost: 5000,
    },
  });

  const updateCosts = (newData: Partial<CostEstimationData>) => {
    const updatedData = { ...estimationData, ...newData };
    const costs = {
      baseCost: 5000,
      activityCost: updatedData.numberOfActivities * 1000,
      shareholderCost: updatedData.numberOfShareholders * 500,
      tradeNameCost: updatedData.hasTradeName ? 2000 : 0,
      locationCost: updatedData.businessLocation ? 3000 : 0,
      totalCost: 0, // Will be calculated below
    };
    
    costs.totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    
    setEstimationData({
      ...updatedData,
      costs,
    });
  };

  const steps = [
    {
      title: "Business Category",
      description: "Select your business category",
      content: (
        <BusinessCategoryStep
          data={estimationData}
          onNext={(data: Partial<CostEstimationData>) => {
            updateCosts(data);
            setCurrentStep(1);
          }}
        />
      ),
    },
    {
      title: "Number of Activities",
      description: "Select number of activities",
      content: (
        <ActivityCountStep
          data={estimationData}
          onNext={(data: Partial<CostEstimationData>) => {
            updateCosts(data);
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Number of Shareholders",
      description: "Specify shareholder count",
      content: (
        <ShareholderCountStep
          data={estimationData}
          onNext={(data: Partial<CostEstimationData>) => {
            updateCosts(data);
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Trade Name",
      description: "Do you have a trade name?",
      content: (
        <TradeNameStep
          data={estimationData}
          onNext={(data: Partial<CostEstimationData>) => {
            updateCosts(data);
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Business Location",
      description: "Select your business location",
      content: (
        <BusinessLocationStep
          data={estimationData}
          onNext={(data: Partial<CostEstimationData>) => {
            updateCosts(data);
            setCurrentStep(5);
          }}
          onBack={() => setCurrentStep(3)}
        />
      ),
    },
    {
      title: "Cost Summary",
      description: "Review your estimated costs",
      content: (
        <SummaryStep
          data={estimationData}
          onBack={() => setCurrentStep(4)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <Title level={1}>Quick Cost Estimation</Title>
        <Paragraph className="lead" style={{ fontSize: "1.2rem" }}>
          Get an instant estimate of your business setup costs in Dubai's free zone.
        </Paragraph>
      </div>
      <div className="container mt-4">
        <Card>
          <Row gutter={24}>
            <Col xs={24} md={6}>
              <Steps
                direction="vertical"
                current={currentStep}
                items={steps.map((item) => ({
                  title: item.title,
                  description: item.description,
                }))}
                className="mb-4"
              />
            </Col>
            <Col xs={24} md={18}>
              <div className="steps-content">{steps[currentStep].content}</div>
              <div className="wizard-total-cost">
                <Typography.Text strong style={{ fontSize: 14 }}>
                  Total Cost: {" "}
                  <span style={{ color: "#1677ff" }}>
                    {estimationData.costs.totalCost.toLocaleString("en-AE", {
                      style: "currency",
                      currency: "AED",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </Typography.Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default QuickCostEstimation; 