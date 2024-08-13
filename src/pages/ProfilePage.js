import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Descriptions, Button, Row, Col, Typography, Badge, Space, Spin } from 'antd';
import { EditOutlined, LockOutlined, PhoneOutlined, CheckCircleOutlined, RedoOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    axios.get('/api/profile') 
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the profile data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20% auto' }} />;
  }

  if (!profileData) {
    return <p>Failed to load profile data.</p>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Accounts</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
          <Menu.Item key="3">Transactions</Menu.Item>
          <Menu.Item key="4">Beneficiaries</Menu.Item>
          <Menu.Item key="5">Identity</Menu.Item>
          <Menu.Item key="6">System Log</Menu.Item>
          <Menu.Item key="7">Checks</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Profile information" extra={
                <Space>
                  <Button icon={<EditOutlined />} type="primary">Edit</Button>
                  <Button icon={<LockOutlined />} danger>Block Profile</Button>
                  <Button icon={<CheckCircleOutlined />} type="default">Check KYC</Button>
                  <Button icon={<RedoOutlined />} type="default">Reset KYC</Button>
                  <Button icon={<PhoneOutlined />} type="default">Update Phone</Button>
                </Space>
              }>
                <Descriptions bordered>
                  <Descriptions.Item label="First name">{profileData.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Last name">{profileData.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Birth date">{profileData.birthDate}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{profileData.gender}</Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>{profileData.email}</Descriptions.Item>
                  <Descriptions.Item label="Country">{profileData.country}</Descriptions.Item>
                  <Descriptions.Item label="Postal code">{profileData.postalCode}</Descriptions.Item>
                  <Descriptions.Item label="Region">{profileData.region}</Descriptions.Item>
                  <Descriptions.Item label="City">{profileData.city}</Descriptions.Item>
                  <Descriptions.Item label="Address line" span={3}>{profileData.address}</Descriptions.Item>
                </Descriptions>
              </Card>
              <Card title="Documents" style={{ marginTop: 24 }}>
                <Descriptions bordered>
                  <Descriptions.Item label="Type">{profileData.documentType}</Descriptions.Item>
                  <Descriptions.Item label="Date of expiry">{profileData.documentExpiry}</Descriptions.Item>
                  <Descriptions.Item label="Number">{profileData.documentNumber}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Status">
                <Descriptions bordered>
                  <Descriptions.Item label="Status">
                    <Badge status="success" text={profileData.status} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Solution">{profileData.solution}</Descriptions.Item>
                  <Descriptions.Item label="Country">{profileData.country}</Descriptions.Item>
                  <Descriptions.Item label="Phone number">{profileData.phone}</Descriptions.Item>
                  <Descriptions.Item label="KYC level">{profileData.kycLevel}</Descriptions.Item>
                  <Descriptions.Item label="KYC status">{profileData.kycStatus}</Descriptions.Item>
                </Descriptions>
              </Card>
              <Card title="Affiliated objects" style={{ marginTop: 24 }}>
                <Descriptions bordered>
                  <Descriptions.Item label="Business">{profileData.business}</Descriptions.Item>
                  <Descriptions.Item label="Employee">{profileData.employee}</Descriptions.Item>
                  <Descriptions.Item label="Affiliation type">{profileData.affiliationType}</Descriptions.Item>
                </Descriptions>
              </Card>
              <Card title="Notes" style={{ marginTop: 24 }}>
                <Descriptions bordered>
                  <Descriptions.Item label="Last Update">{profileData.lastUpdate}</Descriptions.Item>
                  <Descriptions.Item label="Notes">{profileData.notes}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProfilePage;
