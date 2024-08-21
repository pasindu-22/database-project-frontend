import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const RoleSelection = ({ onRoleSelect }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    onRoleSelect(role);
    if (role === 'customer') {
      navigate('/customer-dashboard');
    } else if (role === 'employee' || role === 'manager') {
      navigate('/employee-dashboard');
    }
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
    </div>
  );
};

export default RoleSelection;