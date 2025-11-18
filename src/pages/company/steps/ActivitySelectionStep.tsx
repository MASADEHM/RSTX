import React, { useState, useEffect } from "react";
import { Card, Form, Select, Button } from "antd";
import {
  BusinessCategory,
  Activity,
} from "../../../interfaces/company.interface";

interface ActivitySelectionStepProps {
  businessCategory: BusinessCategory | null;
  selectedActivity: Activity[];
  onNext: (activity: Activity[]) => void;
  onBack: () => void;
}

// Example mapping of activities per business category
const activitiesByCategory: Record<number, Activity[]> = {
  1: [
    {
      code: "A1",
      isc4Code: null,
      description: "Software Development",
      description_Arabic: "تطوير البرمجيات",
    },
    {
      code: "A2",
      isc4Code: null,
      description: "IT Consulting",
      description_Arabic: "استشارات تكنولوجيا المعلومات",
    },
    {
      code: "A3",
      isc4Code: null,
      description: "Cloud Services",
      description_Arabic: "خدمات السحابة",
    },
  ],
  2: [
    {
      code: "B1",
      isc4Code: null,
      description: "Manufacturing Electronics",
      description_Arabic: "تصنيع الإلكترونيات",
    },
    {
      code: "B2",
      isc4Code: null,
      description: "Textile Production",
      description_Arabic: "إنتاج المنسوجات",
    },
    {
      code: "B3",
      isc4Code: null,
      description: "Automobile Assembly",
      description_Arabic: "تجميع السيارات",
    },
  ],
  3: [
    {
      code: "C1",
      isc4Code: null,
      description: "Retail Store",
      description_Arabic: "متجر بيع بالتجزئة",
    },
    {
      code: "C2",
      isc4Code: null,
      description: "E-commerce",
      description_Arabic: "التجارة الإلكترونية",
    },
    {
      code: "C3",
      isc4Code: null,
      description: "Franchise Operations",
      description_Arabic: "عمليات الامتياز",
    },
  ],
  4: [
    {
      code: "D1",
      isc4Code: null,
      description: "Clinic",
      description_Arabic: "عيادة",
    },
    {
      code: "D2",
      isc4Code: null,
      description: "Pharmacy",
      description_Arabic: "صيدلية",
    },
    {
      code: "D3",
      isc4Code: null,
      description: "Medical Equipment Supply",
      description_Arabic: "توريد المعدات الطبية",
    },
  ],
  5: [
    {
      code: "E1",
      isc4Code: null,
      description: "Banking",
      description_Arabic: "الخدمات المصرفية",
    },
    {
      code: "E2",
      isc4Code: null,
      description: "Insurance",
      description_Arabic: "تأمين",
    },
    {
      code: "E3",
      isc4Code: null,
      description: "Investment Advisory",
      description_Arabic: "استشارات الاستثمار",
    },
  ],
};

const ActivitySelectionStep: React.FC<ActivitySelectionStepProps> = ({
  businessCategory,
  selectedActivity,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (businessCategory && activitiesByCategory[businessCategory.id]) {
      setActivities(activitiesByCategory[businessCategory.id]);
    } else {
      setActivities([]);
    }
    form.setFieldsValue({ activity: selectedActivity.map((a) => a.code) });
  }, [businessCategory, selectedActivity, form]);

  const handleSubmit = (values: { activity: string[] }) => {
    // Map selected codes to Activity objects
    const selectedActs = activities.filter((a) => values.activity.includes(a.code));
    onNext(selectedActs);
  };

  return (
    <Card title="Select Business Activity" className="mb-4">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="activity"
          label="Business Activity"
          rules={[
            {
              required: true,
              message: "Please select at least one business activity",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select activities"
            optionLabelProp="label"
            allowClear={true}
            options={activities.map((activity) => ({
              value: activity.code,
              label: activity.description,
              activity: activity,
              description_Arabic: activity.description_Arabic,
            }))}
            // Custom tag render to show both English and Arabic
            tagRender={({ label, value, closable, onClose }) => {
              // label is already English now
              return (
                <span style={{ marginRight: 4 }}>
                  {label}
                  {closable && (
                    <span
                      onClick={onClose}
                      style={{ marginLeft: 4, cursor: "pointer" }}
                    >
                      ×
                    </span>
                  )}
                </span>
              );
            }}
            // No need to set Activity[] in form, just let it store codes
            value={selectedActivity.map((a) => a.code)}
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

export default ActivitySelectionStep; 
