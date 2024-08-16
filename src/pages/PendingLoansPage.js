import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, message, Typography } from 'antd';
import axios from 'axios';

const {Title} = Typography;

const PendingLoansPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend API when component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/api/loanapplications/')
      .then(response => {
        setData(response.data); // Assuming the data is in response.data
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to fetch loan applications.');
        setLoading(false);
      });
  }, []);

  const handleAction = (applicationId, action) => {
    // Prepare data to send to the backend
    const postData = {
      applicationId,
      action, // 'approve' or 'reject'
    };

    // Send data to the backend using Axios
    axios.post('/api/loans/action', postData)
      .then(response => {
        message.success(`Application ${applicationId} ${action}d successfully!`);
        // Update the local state to reflect the action
        setData(prevData =>
          prevData.map(item =>
            item.applicationId === applicationId ? { ...item, approved: action === 'approve' ? 'Approved' : 'Rejected' } : item
          )
        );
      })
      .catch(error => {
        message.error(`Failed to ${action} application ${applicationId}. Please try again.`);
      });
  };

  const columns = [
    {
      title: 'Branch ID',
      dataIndex: 'branchId',
      key: 'branchId',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Application ID',
      dataIndex: 'applicationId',
      key: 'applicationId',
    },
    {
      title: 'Loan Period',
      dataIndex: 'loanPeriod',
      key: 'loanPeriod',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Loan Value',
      dataIndex: 'loanValue',
      key: 'loanValue',
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      key: 'approved',
      render: status => (
        <Tag color={status === 'Pending' ? 'orange' : status === 'Approved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Loan Type',
      dataIndex: 'loanType',
      key: 'loanType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleAction(record.applicationId, 'approve')} disabled={record.approved !== 'Pending'}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleAction(record.applicationId, 'reject')} disabled={record.approved !== 'Pending'}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    
    <div>
    <Title level={2}>Pending Loans</Title>
    <Table 
      columns={columns} 
      dataSource={data} 
      loading={loading} 
      rowKey="applicationId" 
      pagination={{ pageSize: 5 }} // Pagination with 5 rows per page
      style={{
        marginTop: 20, 
        padding: 1,
        rowGap:5,
      }}
    />
    </div>
  );
};

export default PendingLoansPage;
