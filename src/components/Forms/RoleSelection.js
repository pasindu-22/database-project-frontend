import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Row, Col } from 'antd';
import LoginModal from '../Modals/LoginModal';

const { Title } = Typography;

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:'lightgrey' }}>
      <Card
        title={<Title level={2} style={{ textAlign: 'center' }}>Select Role</Title>}
        bordered={false}
        style={{ width: 400, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' ,backgroundColor:'lightsteelblue'}}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Button type="primary" block size="large" onClick={() => handleRoleSelection('manager')}>
              Manager
            </Button>
          </Col>
          <Col span={24}>
            <Button type="primary" block size="large" onClick={() => handleRoleSelection('employee')}>
              Employee
            </Button>
          </Col>
          <Col span={24}>
            <Button type="primary" block size="large" onClick={() => handleRoleSelection('customer')}>
              Customer
            </Button>
          </Col>
        </Row>
      </Card>
      <LoginModal visible={isModalVisible} onClose={handleCloseModal} role={selectedRole} />
    </div>
  );
};

export default RoleSelection;