import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  InputNumber,
  Steps,
  message,
  Radio,
  Upload,
  Select,
  DatePicker,
} from "antd";
import { IMaskInput } from "react-imask";
import {
  CompanySetupData,
  Shareholder,
} from "../../../interfaces/company.interface";
import {
  isShareholderPercentageValid,
  areShareholderNamesUnique,
  areEmiratesIdsUnique,
} from "../../../services/company.business.rules";
import { countryList } from "../../../services/countryMaster";
import { UploadOutlined } from "@ant-design/icons";
import { FieldData } from "rc-field-form/es/interface";
const { Step } = Steps;

interface ShareholderDetailsStepProps {
  data: CompanySetupData;
  onComplete: (shareholders: Shareholder[]) => void;
  onBack: () => void;
}

const ShareholderDetailsStep: React.FC<ShareholderDetailsStepProps> = ({
  data,
  onComplete,
  onBack,
}) => {
  const [currentShareholder, setCurrentShareholder] = useState(0);
  const [shareholders, setShareholders] = useState<Shareholder[]>(
    data.shareholders
  );
  const [subStep, setSubStep] = useState(0);
  const [form] = Form.useForm();
  const [passportFileList, setPassportFileList] = useState<any[]>([]);
  const [isUaeResident, setIsUaeResident] = useState<boolean | undefined>(
    data.shareholders[0]?.isUaeResident ?? true
  );

  // Load current shareholder data into the form on change
  useEffect(() => {
    const current = shareholders[currentShareholder];
    form.setFieldsValue({
      ...current,
      isUaeResident: current?.isUaeResident ?? true,
    });
    setIsUaeResident(current?.isUaeResident ?? true);
    setPassportFileList([]);
    setSubStep(0);
  }, [currentShareholder, form]);

  const onFieldsChange = (
    changedField: FieldData[],
    allFields: FieldData[]
  ) => {
    const name = changedField[0].name[0];
    const value = changedField[0].value;
    setShareholders((prev) => {
      const updated = [...prev];
      updated[currentShareholder] = {
        ...updated[currentShareholder],
        [name]: value,
      };
      return updated;
    });
  };
  // Sub-step navigation
  const nextSubStep = async () => {
    try {
      await form.validateFields(getFieldsForSubStep(subStep));
      // Save all form values for the current shareholder
      const allValues = form.getFieldsValue(true); // true = get all fields, not just touched
      setShareholders((prev) => {
        const updated = [...prev];
        updated[currentShareholder] = {
          ...updated[currentShareholder],
          ...allValues,
          isUaeResident: allValues.isUaeResident,
          passportCopyFile: !allValues.isUaeResident
            ? passportFileList[0]?.originFileObj
            : undefined,
        };
        return updated;
      });
      setSubStep(subStep + 1);
    } catch (error) {
      message.error(
        "Please fill in all required fields correctly before proceeding."
      );
    }
  };
  const prevSubStep = () => setSubStep(subStep - 1);

  // Main step navigation
  const nextShareholder = () => setCurrentShareholder(currentShareholder + 1);
  const prevShareholder = () => setCurrentShareholder(currentShareholder - 1);

  // Sub-step field groups
  function getFieldsForSubStep(step: number) {
    if (step === 0) return ["name", "email", "phone"];
    if (step === 1)
      return [
        "isUaeResident",
        ...(isUaeResident === true
          ? ["emiratesId"]
          : ["passportNumber", "passportExpiry", "countryCode"]),
      ];
    if (step === 2) return ["sharePercentage"];
    return [];
  }

  // Save sub-step data - now only used for final submit
  const handleSubStepFinish = (values: any) => {
    console.log(["shareholders values", values]);
    const updatedShareholders = [...shareholders];
    updatedShareholders[currentShareholder] = {
      ...updatedShareholders[currentShareholder],
      ...values,
      isUaeResident: values.isUaeResident,
      passportCopyFile: !values.isUaeResident
        ? passportFileList[0]?.originFileObj
        : undefined,
    };
    console.log(["updatedShareholders in handleSubStepFinish", updatedShareholders]);
    setShareholders(updatedShareholders);
  };

  // Final submit for all shareholders
  const handleFinalSubmit = async () => {
    try {
      await form.validateFields(getFieldsForSubStep(subStep));
      // Save all form values for the current shareholder
      const allValues = form.getFieldsValue(true);
      setShareholders((prev) => {
        const updated = [...prev];
        updated[currentShareholder] = {
          ...updated[currentShareholder],
          ...allValues,
          isUaeResident: allValues.isUaeResident,
          passportCopyFile: !allValues.isUaeResident
            ? passportFileList[0]?.originFileObj
            : undefined,
        };
        return updated;
      });
      // Business rules
      const allNames = shareholders.map((s) => s.name);
      if (!areShareholderNamesUnique(allNames)) {
        message.error("Each shareholder name must be unique.");
        return;
      }
      const allEmiratesIds = shareholders.map((s) =>
        s.isUaeResident ? s.emiratesId : undefined
      );
      if (!areEmiratesIdsUnique(allEmiratesIds)) {
        message.error(
          "Each Emirates ID must be unique among all shareholders."
        );
        return;
      }
      //   const percentages = shareholders.map(
      //     (s) => Number(s.sharePercentage) || 0
      //   );
      //   if (!isShareholderPercentageValid(percentages)) {
      //     message.error(
      //       "The sum of all shareholder percentages must be exactly 100%."
      //     );
      //     return;
      //   }
      console.log(["shareholders"], ...shareholders);
      onComplete(shareholders);
    } catch {}
  };

  const totalPercentage = shareholders.reduce(
    (sum, shareholder) => sum + (Number(shareholder.sharePercentage) || 0),
    0
  );

  // Stepper for each shareholder
  return (
    <Card
      title={`Shareholder ${currentShareholder + 1} Details`}
      className="mb-4"
    >
      <Steps
        current={currentShareholder}
        items={shareholders.map((_, index) => ({
          title: `Shareholder ${index + 1}`,
        }))}
        className="mb-4"
      />
      <Steps current={subStep} size="small" className="mb-4">
        <Step title="Personal Info" />
        <Step title="Residency Info" />
        <Step title="Share Info" />
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubStepFinish}
        initialValues={{
          ...shareholders[currentShareholder],
          isUaeResident:
            shareholders[currentShareholder]?.isUaeResident ?? true,
        }}
      >
        {/* Step 1: Personal Info */}
        {subStep === 0 && (
          <>
            <Form.Item
              name="name"
              label="Full Name"
              preserve={true}
              rules={[
                { required: true, message: "Please enter the full name" },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              preserve={true}
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              preserve={true}
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </>
        )}
        {/* Step 2: Residency Info */}
        {subStep === 1 && (
          <>
            <Form.Item
              name="isUaeResident"
              label="Are you a UAE resident?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group onChange={(e) => setIsUaeResident(e.target.value)}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
            {isUaeResident === true && (
              <Form.Item
                name="emiratesId"
                label="Emirates ID"
                preserve={true}
                rules={[
                  { required: true, message: "Please enter the Emirates ID" },
                  {
                    pattern: /^784-\d{4}-\d{7}-\d{1}$/,
                    message:
                      "Emirates ID must be in the format 784-XXXX-XXXXXXX-X",
                  },
                ]}
              >
                <IMaskInput
                  mask="784-0000-0000000-0"
                  placeholder="784-0000-0000000-0"
                />
              </Form.Item>
            )}
            {isUaeResident === false && (
              <>
                <Form.Item
                  name="passportNumber"
                  label="Passport Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the passport number",
                    },
                  ]}
                >
                  <Input placeholder="Enter passport number" />
                </Form.Item>
                <Form.Item
                  name="passportExpiry"
                  label="Passport Expiry Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select the passport expiry date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    placeholder="Select expiry date"
                  />
                </Form.Item>
                <Form.Item
                  name="countryCode"
                  label="Country"
                  rules={[
                    { required: true, message: "Please select a country" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select country"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option?.label as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={countryList.map((country) => ({
                      label: country.name,
                      value: country.code,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Passport Copy" required>
                  <Upload
                    beforeUpload={() => false}
                    fileList={passportFileList}
                    onChange={({ fileList }) => setPassportFileList(fileList)}
                    maxCount={1}
                    accept=".pdf,.jpg,.jpeg,.png"
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Passport Copy
                    </Button>
                  </Upload>
                  <div className="text-muted mt-2">
                    Accepted formats: PDF, JPG, JPEG, PNG
                  </div>
                </Form.Item>
              </>
            )}
          </>
        )}
        {/* Step 3: Share Info */}
        {subStep === 2 && (
          <Form.Item
            name="sharePercentage"
            label="Share Percentage"
            preserve={true}
            rules={[
              { required: true, message: "Please enter the share percentage" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Percentage must be between 0 and 100",
              },
            ]}
            help={`Total percentage: ${totalPercentage}%`}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter share percentage"
              min={0}
              max={100}
            />
          </Form.Item>
        )}
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {subStep > 0 && (
              <Button onClick={prevSubStep} style={{ marginRight: 8 }}>
                Previous
              </Button>
            )}
            {subStep < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  // console.log("Next button clicked, current subStep:", subStep);
                  nextSubStep();
                }}
              >
                Next
              </Button>
            )}
            {subStep === 2 && (
              <>
                {currentShareholder > 0 && (
                  <Button onClick={prevShareholder} style={{ marginRight: 8 }}>
                    Previous Shareholder
                  </Button>
                )}
                {currentShareholder < shareholders.length - 1 && (
                  <Button
                    type="primary"
                    onClick={async () => {
                      nextShareholder();
                    }}
                  >
                    Next Shareholder
                  </Button>
                )}
                {currentShareholder === shareholders.length - 1 && (
                  <Button type="primary" onClick={handleFinalSubmit}>
                    Complete
                  </Button>
                )}
              </>
            )}
            {currentShareholder === 0 && subStep === 0 && (
              <Button onClick={onBack} style={{ marginLeft: 8 }}>
                Back
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ShareholderDetailsStep;
