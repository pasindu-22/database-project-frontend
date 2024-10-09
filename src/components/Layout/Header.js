import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
  return (
    <AntHeader style={{
      display: 'flex',
      height: 60,
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      width: '100%',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,185,215,1) 52%, rgba(56,56,123,1) 100%)'
    }}>
      <Title level={3} style={{ color: 'white', margin: 0 }}>A Bank™</Title>
    </AntHeader>
  );
}

export default Header;