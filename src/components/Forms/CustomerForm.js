import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Select,
  Space,
  Upload,
  DatePicker,
  Input,
  Row,
  Col,
} from 'antd';
// import { Customer } from '../../../backend/models';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 6,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

const CustomerForm = () => (
  <Row justify="center">
    <Col span={12}>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
          'color-picker': null,
        }}
        style={{
          maxWidth: '100%',
        }}
      >
        <Form.Item label="Customer Form">
          <span className="ant-form-text">New</span>
        </Form.Item>
        <Form.Item
          name="province"
          label="District"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your country!',
            },
          ]}
        >
          <Select placeholder="Please select a district">
            <Option value="galle">Galle</Option>
            <Option value="matara">Matara</Option>
            <Option value="hambantota">Hambantota</Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name = "birtdate"
          label="BirthDate">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="ID Number"
          name="idnumber"
          rules={[
            {
              required: true,
              message: 'Please input Id Number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="select-multiple"
          label="Classes"
          rules={[
            {
              required: true,
              message: 'Please select vehicle classes!',
              type: 'array',
            },
          ]}
        >
        <Select mode="multiple" placeholder="Please select vehicle classes">
            <Option value="a">A</Option>
            <Option value="b1">B1</Option>
            <Option value="b2">B2</Option>
            <Option value="c1">C1</Option>
            <Option value="c2">C2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact_info"
          rules={[
            {
              required: true,
              message: 'Please input your contact!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total Amount"
          name="total_amount"
        >
          <Input />
        </Form.Item>

        


        <Form.Item
          name="upload"
          label="Upload Photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Please upload a photo"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);
export default CustomerForm;