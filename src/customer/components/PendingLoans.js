import React, { useState, useEffect } from 'react';
import { Table, message , Tag, Typography} from 'antd';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
// import Title from 'antd/es/skeleton/Title';

const { Title } = Typography;

const PendingLoans = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const customerId = user?.Customer_ID

  useEffect(() => {
    // Fetch data from backend API
    if (customerId) { 
      axios.get(`https://database-backend-g8-d3f914ee6287.herokuapp.com/api/loanapplications/${customerId}/getPendingByCustomer`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        message.error('Failed to fetch data');
        setLoading(false);
      });
      console.log(data);
    }
  }, [customerId]);

  const columns = [
    {
      title: 'Branch ID',
      dataIndex: 'Branch_ID',
      key: 'Branch_ID',
    },
    {
      title: 'Loan Period',
      dataIndex: 'LoanPeriod',
      key: 'LoanPeriod',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Value',
      dataIndex: 'LoanValue',
      key: 'Value',
    },
    {
      title: 'Approval Status',
      dataIndex: 'Approved',
      key: 'Approved',
      render: (status) => {
        let color = '';
        let text = '';
        if (status === 1) {
          color = 'green';
          text = 'Approved';
        } else if (status === 0) {
          color = 'orange';
          text = 'Pending';
        } else if (status === -1) {
          color = 'red';
          text = 'Rejected';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Loan Type',
      dataIndex: 'LoanType',
      key: 'LoanType',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Loan History</Title>
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
    </div>
  );
};

export default PendingLoans;