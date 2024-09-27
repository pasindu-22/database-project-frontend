import React, { useEffect, useState, useContext } from 'react';
import { Layout, List, Card, Typography, Spin, Table,Modal, Button } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { CustomerContext } from '../../contexts/CustomerContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const [accountID, setAccountID] = useState([]);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { customerId } = useContext(CustomerContext);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/accounts/customer/${customerId}`);
        setAccountData(response.data);
      } catch (error) {
        console.error("There was an error fetching the account data!", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchAccountData();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (accountID.length) {
        try {
          const response = await axiosInstance.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/transactions/byAccount/${accountID}`);
          console.log(response.data);
          setTransactions(response.data);
        } catch (error) {
          console.error("There was an error fetching the transactions data!");
        }
      }
    };
    fetchTransactions();
  }, [accountID]);

  const showModal = (id) => {
      setAccountID(id);
      setIsModalVisible(true);
  }
  const handleCancel = () => {
      setIsModalVisible(false);
  }

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (accountData.length === 0) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#A9A9A9', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Customer Accounts</Title>
        </Header>
        <Content style={{ background: '#A9A9A9', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No account data found</p>
        </Content>
      </Layout>
    );
  }

  const columns = [
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'date',
    },
    {
        title: 'From',
        dataIndex: 'FromAccount',
        key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'ToAccount',
      key: 'to',
    },
    {
        title: 'Debit/Credit',
        dataIndex: 'Type',
        key: 'type',
    },
    {
        title: 'Value',
        dataIndex: 'Value',
        key: 'value',
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' , borderRadius:'20'}}>
      <Header style={{ background: '#b7dcfa', padding: 0, textAlign: 'center' }}>
        <Title level={2}>Customer Accounts</Title>
      </Header>
      <Content style={{ background: '#b7dcfa', padding: '50px' }}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={accountData}
          renderItem={account => (
            <List.Item>
              <Card 
                    type="inner" 
                    title={`Account IDs: ${account.Account_ID}`} 
                    extra={<Button type='primary' onClick={() => showModal(account.Account_ID)}>Transactions</Button>}

                    >
                <p>Branch ID: {account.Branch_ID}</p>
                <p>Type: {account.Type}</p>
                <p>Plan: {account.Plan}</p>
                <p>Opening Date: {account.OpeningDate}</p>
                <p>Balance: {account.Balance}</p>
              </Card>
              <Modal
                title="Transactions"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                >
                    <Table
                    columns={columns}
                    dataSource={transactions}
                    />
                </Modal>

            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default AccountPage;