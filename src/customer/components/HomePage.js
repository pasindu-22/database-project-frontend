import React, { useState, useEffect  } from 'react';
import { Button, Descriptions, Statistic, Row, Col, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = localStorage.getItem('details');
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    }
    setLoading(false);
  }, []);

  const contentStyle = {
    margin: 0,
    width: '100%',
    // height: '160px',
    color: '#fff',
    // lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const items = details ? [
    {
      label: 'Name',
      children: details.Name,
    },
    {
      label: 'NIC',
      children: details.NIC,
    },

    {
      label: 'Address',
      children: details.Address,
    },
    {
      label: 'Accounts',
      span: {
        xs: 1,
        sm: 2,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      },
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
        </>
      ),
    },
    {
      label: 'Fixed Deposits',
      span: {
        xs: 1,
        sm: 2,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      },
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
        </>
      ),
    },
    {
      label: 'Loans',
      span: {
        xs: 1,
        sm: 2,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      },
      children: (
        <>
          CPU: 6 Core 3.5 GHz
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
        </>
      ),
    },
  ] : [];
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [greetings, setGreetings] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime.toLocaleTimeString());

      const hours = currentTime.getHours();
      if (hours < 12) {
        setGreetings('  Good Morning!');
      } else if (hours < 18) {
        setGreetings('  Good Afternoon!');
      } else {
        setGreetings('  Good Evening!');
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);



  const handleNewTransaction = () => {
    navigate('/customer/transaction/new');
  };

  const handleNewCustomer = () => {
    navigate('/customer/loan/new');
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {/* <div style={{display:'flex', justifyContent:'left',padding: '20px'}}>
          <h1>Hey!</h1>
          <h1>{greetings}</h1>
      </div> */}

        {/* descriptions div */}
        <div>
          <Descriptions
            title="Responsive Descriptions"
            bordered
            column={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            style={
              {
                padding: '20px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '10px',
              }}
            items={items}
          />
        </div>

      </div>




      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Col span={7} style={{ backgroundColor: "white", padding: "20px", borderRadius: "15px" }}>
          <Col span={12}>
            <Statistic title="Active Users" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            <Button
              style={{
                marginTop: 16,
              }}
              type="primary"
            >
              Recharge
            </Button>
          </Col>
        </Col>
        <Col span={7} style={{ backgroundColor: "white", padding: "20px", borderRadius: "15px" }}>
          <Col span={12}>
            <Statistic title="Active Users" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            <Button
              style={{
                marginTop: 16,
              }}
              type="primary"
            >
              Recharge
            </Button>
          </Col>
        </Col>
        <Col span={7} style={{ backgroundColor: "white", padding: "20px", borderRadius: "15px" }}>
          <Col span={12}>
            <Statistic title="Active Users" value={112893} />
          </Col>
          <Col span={12}>
            <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            <Button
              style={{
                marginTop: 16,
              }}
              type="primary"
            >
              Recharge
            </Button>
          </Col>
        </Col>
      </div>
    </div>

  );
};

export default HomePage;
