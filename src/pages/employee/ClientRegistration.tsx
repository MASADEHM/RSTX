import React, { useState } from 'react';
import { Card, Form, Input, Select, DatePicker, Radio, Button, Space, Typography, Row, Col } from 'antd';
import EmployeeLayout from '../../shared/EmployeeLayout';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

const ClientRegistration: React.FC = () => {
  const [searchBy, setSearchBy] = useState('passport');
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleClear = () => {
    // Logic to clear form fields
    console.log('Clear form');
  };

  return (
    <EmployeeLayout>
      <div style={{ padding: '0 1rem' }}>
        <Title level={2}>{t('person_registration')}</Title>

        <Card title={t('person_registration').toUpperCase()} style={{ marginTop: 24 }}>
          <Form
            name="person_registration"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ searchBy: 'passport' }}
          >
            <Form.Item label={`${t('search_by')} *`}>
              <Radio.Group onChange={(e) => setSearchBy(e.target.value)} value={searchBy}>
                <Radio value="passport">{t('passport_no')}</Radio>
                <Radio value="emirates">{t('emirates_id')}</Radio>
                <Radio value="unified">{t('unified_profile_no')}</Radio>
              </Radio.Group>
            </Form.Item>

            {searchBy === 'passport' && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={`${t('passport_no')} *`}
                    name="passportNo"
                    rules={[{ required: true, message: t('please_input_passport_no') }]
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={`${t('passport_nationality')} *`}
                    name="passportNationality"
                    rules={[{ required: true, message: t('please_select_passport_nationality') }]
                    }
                  >
                    <Select placeholder="-select-">
                      <Option value="nationality1">{t('nationality1')}</Option>
                      <Option value="nationality2">{t('nationality2')}</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}

            {searchBy === 'emirates' && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label={`${t('emirates_id')}*`}
                    name="emiratesId"
                    rules={[{ required: true, message: t('please_input_emirates_id') }]
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {searchBy === 'unified' && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={`${t('unified_profile_no')} *`}
                    name="unifiedProfileNo"
                    rules={[{ required: true, message: t('please_input_unified_profile_no') }]
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {(searchBy === 'passport' || searchBy === 'emirates') && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={`${t('gender')} *`}
                    name="gender"
                    rules={[{ required: true, message: t('please_select_gender') }]}
                  >
                    <Select placeholder="-select-">
                      <Option value="male">{t('male')}</Option>
                      <Option value="female">{t('female')}</Option>
                      <Option value="other">{t('other')}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={`${t('date_of_birth')} *`}
                    name="dateOfBirth"
                    rules={[{ required: true, message: t('please_input_date_of_birth') }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t('search')}
                </Button>
                <Button htmlType="button" onClick={handleClear}>
                  {t('clear')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <p>
            <a href="#">{t('click_to_register_manually')}</a>
          </p>
        </Card>
      </div>
    </EmployeeLayout>
  );
};

export default ClientRegistration; 