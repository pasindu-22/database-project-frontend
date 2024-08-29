import React, { useEffect, useState } from 'react';
import { Card ,Typography,Layout, Spin, List, Modal, Table, Button} from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const {Header,Content} = Layout;
const {Title} = Typography;

const TransactionsList = () => {

    const [ loading, setLoading] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [accountID, setAccountID] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const {details} = useAuth();

    useEffect(() => {
        const fetchAccountData = async () => {
            // code goes here
            try {
              const response = await axios.get(`http://localhost:3001/api/accounts/customer/${details.Customer_ID}`);
              setAccountData(response.data);
            } catch (error) {
               console.error("There was an error fetching the account data!", error);
            } finally {
                setLoading(false);
            }
        }
        if (details && details.Customer_ID) {
            fetchAccountData();
        } else {
            setLoading(false);
        }

    },[details.Customer_ID]);

    useEffect(() => {
      const fetchTransactions = async () => {
        if (accountID) {
          try {
            const response = await axios.get(`http://localhost:3001/api/transactions/byAccount/${accountID}`);
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
              <Spin size="large"/>
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
            <Title level={2}>Account Transactions</Title>
          </Header>
          <Content style={{ background: '#b7dcfa', padding: '50px'}}>
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
export default TransactionsList;