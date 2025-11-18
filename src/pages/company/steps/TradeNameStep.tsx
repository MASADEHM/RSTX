import React, { useState, useEffect } from 'react';
import { Form, Radio, Upload, Input, Button, Card, Space, message, Spin, Alert, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TradeName, CompanySetupData } from '../../../interfaces/company.interface';
import type { UploadFile } from 'antd/es/upload/interface';
import { areTradeNamesUnique } from '../../../services/company.business.rules';
import { tradenameService, TradeNamePayload } from '../../../services/tradename.service';
import { CheckCircleTwoTone } from '@ant-design/icons';

interface TradeNameStepProps {
    data: CompanySetupData;
    onNext: (tradeName: TradeName) => void;
    onBack: (tradeName: TradeName) => void;
}

const TradeNameStep: React.FC<TradeNameStepProps> = ({ data, onNext, onBack }) => {
    const [form] = Form.useForm();
    const [hasReservedName, setHasReservedName] = useState<boolean>(data.tradeName.hasReservedName || false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [nameChecks, setNameChecks] = useState<Record<number, any>>({});
    const [loadingChecks, setLoadingChecks] = useState<Record<number, boolean>>({});
    // Initialize form with saved values
    useEffect(() => {
        form.setFieldsValue({
            hasReservedName: data.tradeName.hasReservedName,
            suggestedNames: data.tradeName.suggestedNames,
        });
        setHasReservedName(data.tradeName.hasReservedName || false);
    }, [data.tradeName, form]);

    const handleSubmit = (values: any) => {
        if (!hasReservedName) {
            const names = values.suggestedNames || [];
            if (!areTradeNamesUnique(names)) {
                message.error('All trade names must be different.');
                return;
            }
        }
        const tradeName: TradeName = {
            hasReservedName: values.hasReservedName,
            reservedNameDocument: fileList[0]?.originFileObj,
            suggestedNames: values.suggestedNames || []
        };
        onNext(tradeName);
    };

    const handleBack = async () => {
        const values = await form.getFieldsValue();
        const tradeName: TradeName = {
            hasReservedName: values.hasReservedName,
            reservedNameDocument: fileList[0]?.originFileObj,
            suggestedNames: values.suggestedNames || []
        };
        onBack(tradeName);
    };

    const handleFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    // Check trade name properties when names change
    const handleNameChange = async (name: string, index: number) => {
        console.log(["name", name]);
        if (!name) return;
        setLoadingChecks(prev => ({ ...prev, [index]: true }));
        try {
            const payload: TradeNamePayload = {
                messages: [name],
                thread_id: Math.random().toString()
            }
            const result = await tradenameService.check(payload);
            console.log(["result", result]);

            // const result = await tradenameService.check(name);
            // console.log(["result", result]);
            setNameChecks(prev => ({ ...prev, [index]: result }));
        } catch (e) {
            setNameChecks(prev => ({ ...prev, [index]: null }));
        }
        finally {
            setLoadingChecks(prev => ({ ...prev, [index]: false }));
        }
    };

    return (
        <Card title="Trade Name" className="mb-4">
            <Row gutter={32}>
                <Col xs={24} md={12}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            hasReservedName: data.tradeName.hasReservedName,
                            suggestedNames: data.tradeName.suggestedNames,
                        }}
                    >
                        <Form.Item
                            name="hasReservedName"
                            label="Do you have a reserved trade name?"
                            rules={[{ required: true, message: 'Please select an option' }]}
                        >
                            <Radio.Group onChange={(e) => setHasReservedName(e.target.value)}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {hasReservedName ? (
                            <Form.Item
                                label="Upload Reserved Name Document"
                                rules={[{ required: true, message: 'Please upload the document' }]}
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    maxCount={1}
                                    accept=".pdf,.doc,.docx"
                                >
                                    <Button icon={<UploadOutlined />}>Upload Document</Button>
                                </Upload>
                                <div className="text-muted mt-2">
                                    Accepted formats: PDF, DOC, DOCX
                                </div>
                            </Form.Item>
                        ) : (
                            <Form.Item
                                label="Suggested Company Names"
                                rules={[{ required: true, message: 'Please provide at least one suggested name' }]}
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Form.List
                                        name="suggestedNames"
                                        rules={[
                                            {
                                                validator: async (_, names) => {
                                                    if (!names || names.length < 3) {
                                                        return Promise.reject(new Error('Please provide at least 3 suggested names'));
                                                    }
                                                    if (!areTradeNamesUnique(names)) {
                                                        return Promise.reject(new Error('All trade names must be different.'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map((field, index) => {
                                                    const { key, ...restField } = field;
                                                    return (
                                                        <Form.Item
                                                            required={false}
                                                            key={key}
                                                            rules={[{ required: true, message: 'Please enter a name' }]}
                                                        >
                                                            <Space style={{ width: '100%' }} align="start">
                                                                <Form.Item
                                                                    {...restField}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: 'Please enter a name or delete this field',
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input
                                                                        placeholder="Enter company name"
                                                                        style={{ width: '100%' }}
                                                                        onBlur={e => handleNameChange(e.target.value, index)}
                                                                    />
                                                                </Form.Item>
                                                                {/* Display green ticks for checks */}
                                                                <div style={{ minWidth: 180 }}>
                                                                    {loadingChecks[index] ? (
                                                                        <Spin size="small" />
                                                                    ) : (
                                                                        nameChecks[index] && (
                                                                            <Space size={4} direction="vertical">
                                                                                {nameChecks[index].hasNumber && <span><CheckCircleTwoTone twoToneColor="#52c41a" /> Number</span>}
                                                                                {nameChecks[index].hasRegionName && <span><CheckCircleTwoTone twoToneColor="#52c41a" /> Region</span>}
                                                                                {nameChecks[index].hasArabizedName && <span><CheckCircleTwoTone twoToneColor="#52c41a" /> Arabized</span>}
                                                                                {nameChecks[index].hasGlobalName && <span><CheckCircleTwoTone twoToneColor="#52c41a" /> Global</span>}
                                                                                {nameChecks[index].arabicEquivalentName && <span><CheckCircleTwoTone twoToneColor="#52c41a" /> Arabic Equivalent : {nameChecks[index].arabicEquivalentName}</span>}
                                                                            </Space>
                                                                        )
                                                                    )}
                                                                </div>
                                                                {fields.length > 3 && (
                                                                    <Button type="link" onClick={() => remove(field.name)}>
                                                                        Delete
                                                                    </Button>
                                                                )}
                                                            </Space>
                                                        </Form.Item>
                                                    );
                                                })}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        style={{ width: '100%' }}
                                                    >
                                                        Add Name
                                                    </Button>
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Space>
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button type="default" onClick={handleBack} style={{ marginRight: 8 }}>
                                Back
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} md={12}>
                    {!hasReservedName && (
                        <Alert
                            type="info"
                            showIcon
                            style={{ marginBottom: 16, fontSize: 13, lineHeight: 1.5, position: 'sticky', top: 24, minWidth: 350, maxWidth: 400, width: '100%' }}
                            message={
                                <div style={{ fontSize: 13 }}>
                                    <strong>Our AI tool will check your trade names for:</strong>
                                    <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
                                        <li>Numbers in the name</li>
                                        <li>Arabized foreign names (e.g., "مايكروسوفت")</li>
                                        <li>Region names (e.g., Gulf, Arabia, Middle East)</li>
                                        <li>Similarity to global brands (e.g., Apple, Samsung)</li>
                                    </ul>
                                </div>
                            }
                        />
                    )}
                </Col>
            </Row>
        </Card>
    );
};

export default TradeNameStep; 