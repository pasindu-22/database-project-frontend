import React, { useEffect, useState } from 'react';
import { Card ,Typography,Layout, Spin, List, Modal, Table, Button} from 'antd';
import { useAuth } from '../../contexts/AuthContext';
// import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import useAxiosInterceptor from '../../utils/useAxiosInterceptor';

const {Header,Content} = Layout;
const {Title} = Typography;

const TransactionsList = () => {

    const [ loading, setLoading] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [accountID, setAccountID] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const {details} = useAuth();
    
    //  This listens for 401 errors and redirects to the login page
    useAxiosInterceptor();  // USe this custome hook to handle session expiration
    
    useEffect(() => {
        const fetchAccountData = async () => {
            // code goes here

            if (!details || !details.Customer_ID) {
              setLoading(false);
              return;
            }
            try {
              const response = await axiosInstance.get(`http://localhost:3001/api/accounts/customer/${details.Customer_ID}`);
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

    },[details]);

    useEffect(() => {
      const fetchTransactions = async () => {
        if (accountID) {
          try {
            const response = await axiosInstance.get(`http://localhost:3001/api/transactions/byAccount/${accountID}`);
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
            title: 'Note',
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
        <div style={{ padding: '40px'}}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Account Transactions</Title>
          <Content style={{  padding: '20px'}}>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={accountData}
              renderItem={account => (
                <List.Item>
                  <Card 
                    type="inner" 
                    title={`Account IDs: ${account.Account_ID}`} 
                    style={{backgroundColor: 'rgba(224, 247, 250, 0.8)'}}
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
        </div>
      );
};
export default TransactionsList;