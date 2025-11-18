import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Select,
  DatePicker,
  Upload,
  Steps,
} from "antd";
import { Manager } from "../../../interfaces/company.interface";
import { countryList } from "../../../services/countryMaster";
import { UploadOutlined } from "@ant-design/icons";
import { FieldData } from "rc-field-form/es/interface";
const { Step } = Steps;

interface ManagerDetailsStepProps {
  data: Manager | null;
  onNext: (manager: Manager) => void;
  onBack: () => void;
}

const ManagerDetailsStep: React.FC<ManagerDetailsStepProps> = ({
  data,
  onNext,
  onBack,
}) => {
  const [form] = Form.useForm();
  const [subStep, setSubStep] = useState(0);
  const [managerDetails, setMangerDetails] = useState<Manager>({
    name: "testName",
    phone: "121",
    email: "",
    isUaeResident: false,
    countryCode: "",
    emiratesId: "",
    passportCopyFileList: [],
    passportExpiry: "",
    passportNumber: "",
  });
  const [passportFileList, setPassportFileList] = useState<any[]>([]);
  const [isUaeResident, setIsUaeResident] = useState<boolean>(
    data?.isUaeResident ?? true
  );

  useEffect(() => {
    console.log(["managerDetails", { ...managerDetails }]);
    form.setFieldsValue({
      ...managerDetails,
    });

    setIsUaeResident(data?.isUaeResident ?? true);
    setPassportFileList(data?.passportCopyFileList ?? []);
    setSubStep(0);
  }, [data, form]);

  function getFieldsForSubStep(step: number) {
    if (step === 0) return ["name", "email", "phone"];
    if (step === 1)
      return [
        "isUaeResident",
        ...(isUaeResident === true
          ? ["emiratesId"]
          : [
              "passportNumber",
              "passportExpiry",
              "countryCode",
              "passportCopyFileList",
            ]),
      ];
    return [];
  }

  const onFieldChange = (changedFiled: FieldData[], allFields: FieldData[]) => {
    const name = changedFiled[0].name[0];
    const value = changedFiled[0].value;
    setMangerDetails({ ...managerDetails, [name]: value });
  };
  const nextSubStep = async () => {
    try {
      console.log([
        "subStep",
        subStep,
        "fields values",
        getFieldsForSubStep(subStep),
      ]);
      await form.validateFields(getFieldsForSubStep(subStep));
      setSubStep(subStep + 1);
    } catch {}
  };
  const prevSubStep = () => setSubStep(subStep - 1);

  const handleSubStepFinish = (values: any) => {
    console.log('this is the final step')
    console.log(form.getFieldsValue());
    onNext({
      ...data,
      ...values,
      isUaeResident,
      passportCopyFileList: passportFileList,
    });
  };

  return (
    <Card title="Manager Details" className="mb-4">
      <Steps current={subStep} size="small" className="mb-4">
        <Step title="Personal Info" />
        <Step title="Residency Info" />
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubStepFinish}
        onFieldsChange={onFieldChange}
      >
        {/* Step 1: Personal Info */}
        {subStep === 0 && (
          <>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter the full name" },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              name="email"
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
              preserve={true}
              label="Phone Number"
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
                <Radio value={true}>Yes</Radio> <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
            {isUaeResident === true && (
              <Form.Item
                name="emiratesId"
                label="Emirates ID"
                rules={[
                  { required: true, message: "Please enter the Emirates ID" },
                  {
                    pattern: /^784-\d{4}-\d{7}-\d{1}$/,
                    message:
                      "Emirates ID must be in the format 784-XXXX-XXXXXXX-X",
                  },
                ]}
              >
                <Input placeholder="784-0000-0000000-0" />
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
                <Form.Item
                  name="passportCopyFileList"
                  label="Passport Copy"
                  rules={[
                    {
                      required: true,
                      message: "Please upload the passport copy",
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={() => false}
                    fileList={passportFileList}
                    onChange={({ fileList }) => {
                      setPassportFileList(fileList);
                      form.setFieldsValue({ passportCopyFileList: fileList });
                    }}
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
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {subStep > 0 && (
              <Button onClick={prevSubStep} style={{ marginRight: 8 }}>
                Previous
              </Button>
            )}
            {subStep < 1 && (
              <Button type="primary" onClick={nextSubStep}>
                Next
              </Button>
            )}
            {subStep === 1 && (
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            )}
            {subStep === 0 && (
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

export default ManagerDetailsStep;
