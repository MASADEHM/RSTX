import React from "react";
import { Form, Select, Button, Card, Modal } from "antd";
import { CostEstimationStepProps } from "../../../interfaces/costEstimation.interface";

const businessLocations = [
  "Dragon Mart One",
  "Dragon Mart Two",
  "Dragon Mart Six",
  "Palm Jumeirah",
  "Jumeirah Village Circle",
  "Jumeirah Village Triangle",
];

const BusinessLocationStep: React.FC<CostEstimationStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { businessLocation: string }) => {
    onNext?.({ businessLocation: values.businessLocation });
  };

  const handleVirtualLicenseClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    Modal.info({
      title: "Virtual License Information",
      content: (
        <div>
          Ready to go virtual? Our partner <b>DUQE</b> offers seamless virtual
          business licenses—
          <a
            href="https://www.duqe.ae/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1677ff" }}
          >
            click here to explore your options!
          </a>
        </div>
      ),
      okText: "Close",
    });
  };

  return (
    <Card title="Business Location" className="mb-4">
      <div style={{ marginBottom: 16, fontWeight: 500 }}>
        Where would you like to operate your business?
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ businessLocation: data.businessLocation }}
      >
        <Form.Item
          name="businessLocation"
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span >
                Select a business location
              </span>
              <a
                href="#"
                style={{
                  color: "#1677ff",
                  fontWeight: 400,
                  fontSize: 12,
                  marginLeft: 16,
                }}
                onClick={handleVirtualLicenseClick}
              >
                I'm looking for a virtual license?
              </a>
            </div>
          }
          rules={[
            { required: true, message: "Please select a business location" },
          ]}
        >
          <Select
            placeholder="Select a business location"
            options={businessLocations.map((loc) => ({
              value: loc,
              label: loc,
            }))}
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

export default BusinessLocationStep;
