import React, { useState } from "react";
import { Steps, Row, Col, Card, Typography } from "antd";
import { CompanySetupData, Activity } from "../../interfaces/company.interface";
import BusinessCategoryStep from "./steps/BusinessCategoryStep";
import TradeNameStep from "./steps/TradeNameStep";
import ShareholderCountStep from "./steps/ShareholderCountStep";
import ShareholderDetailsStep from "./steps/ShareholderDetailsStep";
import ActivitySelectionStep from "./steps/ActivitySelectionStep";
import ManagerDetailsStep from "./steps/ManagerDetailsStep";

const { Title, Paragraph } = Typography;
const CompanySetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyData, setCompanyData] = useState<CompanySetupData>({
    businessCategory: null,
    activity: [],
    tradeName: {
      hasReservedName: false,
      suggestedNames: [],
    },
    numberOfShareholders: 0,
    shareholders: [],
    manager: null,
  });

  const steps = [
    {
      title: "Business Category",
      description: "Select your business category",
      content: (
        <BusinessCategoryStep
          data={companyData}
          onNext={(category) => {
            setCompanyData({ ...companyData, businessCategory: category });
            setCurrentStep(1);
          }}
        />
      ),
    },
    {
      title: "Activity Selection",
      description: "Select your business activity",
      content: (
        <ActivitySelectionStep
          businessCategory={companyData.businessCategory}
          selectedActivity={companyData.activity}
          onNext={(activity) => {
            console.log({ ...companyData });
            setCompanyData({ ...companyData, activity });
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Trade Name",
      description: "Provide company name details",
      content: (
        <TradeNameStep
          data={companyData}
          onNext={(tradeName) => {
            console.log({ ...companyData });
            setCompanyData({ ...companyData, tradeName });
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Number of Shareholders",
      description: "Specify shareholder count",
      content: (
        <ShareholderCountStep
          data={companyData}
          onNext={(count) => {
            setCompanyData({
              ...companyData,
              numberOfShareholders: count,
              shareholders: Array(count)
                .fill(null)
                .map((_, index) => ({
                  id: index + 1,
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  sharePercentage: 0,
                })),
            });
            console.log({ ...companyData });
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Shareholder Details",
      description: "Enter shareholder information",
      content: (
        <ShareholderDetailsStep
          data={companyData}
          onComplete={(shareholders) => {
            setCompanyData({ ...companyData, shareholders });

            setCurrentStep(5);
            console.log({ ...companyData });
          }}
          onBack={() => setCurrentStep(3)}
        />
      ),
    },
    {
      title: "Manager Details",
      description: "Enter license manager information",
      content: (
        <ManagerDetailsStep
          data={companyData.manager}
          onNext={(manager) => {
            setCompanyData({ ...companyData, manager });
            console.log(["company Data", { ...companyData }]);
            setCurrentStep(6);
          }}
          onBack={() => setCurrentStep(4)}
        />
      ),
    },
    {
      title: "Complete Setup",
      description: "Review and finish setup",
      content: <div>Setup Complete!</div>,
    },
  ];

  return (
    <>
      <div className="text-center mb-5">
        <Title level={1}>Start Your Business</Title>
        <Paragraph className="lead" style={{ fontSize: "1.2rem" }}>
          Your trusted partner in establishing and growing your business in
          Dubai's thriving free zone.
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
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CompanySetup;
