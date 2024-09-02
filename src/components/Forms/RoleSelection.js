import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Row, Col } from 'antd';
import LoginModal from '../Modals/LoginModal';
import '../../styles/RoleSelection.css';
import backgroundImage from '../Layout/SL-020622-4930-40.jpg';

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // Optional: to cover the entire div
      backgroundPosition: 'center', // Optional: to center the image
      filter: 'brightness(%)', // Optional: to darken the image
      // background: 'linear-gradient(25deg, rgba(120, 19, 189, 1), rgba(110, 216, 230, 1))'
    }}>
      <Card
        title={<Title level={2} style={{ textAlign: 'center' }}>A Bank Login Portal</Title>}
        bordered={false}
        style={{ width: 400, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' ,backgroundColor:'lightsteelblue'}}
      >
        <Row gutter={[16, 16]} justify='center' >
          <Col span={24}>
            <Button type="primary" block size="large" onClick={() => handleRoleSelection('customer')}
              style={{borderRadius:'80px'}}>
              Already a Customer? Login Here.
            </Button>
          </Col>
          <Col span={24}>
            <hr style={{ margin: '16px 0' }} />
          </Col>
          <Col span={24}>
            <Title level={4} style={{ textAlign: 'center' }}>An Employee?</Title>
          </Col>
          <div style={{display:'flex', direction:'row'}}>
          <Col span={10}>
            <Button type="primary" block size="medium" onClick={() => handleRoleSelection('manager')}
              style={{borderRadius:'80px'}}>
              Manager
            </Button>
          </Col>
          <Col span={10}>
            <Button type="primary" block size="medium" onClick={() => handleRoleSelection('employee')}
              style={{borderRadius:'80px'}}>
              Employee
            </Button>
          </Col>
          </div>
        </Row>
      </Card>
      <LoginModal visible={isModalVisible} onClose={handleCloseModal} role={selectedRole} />
    </div>
  );
};

export default RoleSelection;