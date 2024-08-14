import React, { useEffect, useState, useContext } from 'react';
import { Layout, Card, Descriptions, Button, Row, Col, Typography, Spin, Form, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { CustomerContext } from '../contexts/CustomerContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { customerId } = useContext(CustomerContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/customers/${customerId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("There was an error fetching the profile data!", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(profileData);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/customers/${customerId}`, values);
      setProfileData(values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("There was an error updating the profile data!", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Profile</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Profile</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No profile data found</p>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
        <Title level={2}>Customer Profile</Title>
      </Header>
      <Content style={{ background: '#A9A9A9', padding: '50px' }}>
        <Card
          title="Profile Details"
          extra={<Button icon={<EditOutlined />} onClick={showModal}>Edit</Button>}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Customer ID">{profileData.Customer_ID}</Descriptions.Item>
            <Descriptions.Item label="Name">{profileData.Name}</Descriptions.Item>
            <Descriptions.Item label="NIC">{profileData.NIC}</Descriptions.Item>
            <Descriptions.Item label="Address">{profileData.Address}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nic" label="NIC" rules={[{ required: true, message: 'Please input the NIC!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ProfilePage;