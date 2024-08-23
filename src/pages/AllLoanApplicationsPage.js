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
  }, []);  // Empty array means this effect runs only once after initial render

  const handleAction = (Application_Id, Approved) => {
    // Prepare data to send to the backend
    const postData = {
      Application_Id,
      Approved, // 'approve' or 'reject'
    };

    // Send data to the backend using Axios
    axios.put(`http://localhost:3001/api/loanapplications/${Application_Id}`, postData)
      .then(response => {
        message.success(`Application ${Application_Id} ${Approved} successfully!`);
        // Update the local state to reflect the action
        setData(prevData =>
          prevData.map(item =>
            item.Application_ID === Application_Id ? { ...item, Approved: Approved === 'approved' ? 'approved' : 'rejected' } : item
          )
        );
      })
      .catch(error => {
        message.error(`Failed to ${Approved} application ${Application_Id}. Please try again.`);
      });
  };

  const columns = [
    {
      title: 'Branch ID',
      dataIndex: 'Branch_ID',
      key: 'branchId',
    },
    {
      title: 'Customer ID',
      dataIndex: 'Customer_ID',
      key: 'customerId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Application ID',
      dataIndex: 'Application_ID',
      key: 'applicationId',
    },
    {
      title: 'Loan Period',
      dataIndex: 'LoanPeriod',
      key: 'loanPeriod',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'date',
    },
    {
      title: 'Loan Value',
      dataIndex: 'LoanValue',
      key: 'loanValue',
    },
    {
      title: 'Approved',
      dataIndex: 'Approved',
      key: 'approved',
      render: status => (
        <Tag color={status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red'}>
          {status === 'pending' ? 'Pending' : status === 'approved' ? 'Approved' : 'Rejected'}
        </Tag>
      ),
    },
    {
      title: 'Loan Type',
      dataIndex: 'LoanType',
      key: 'loanType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleAction(record.Application_ID, 'approved')} >
            Approve
          </Button>
          <Button type="danger" onClick={() => handleAction(record.Application_ID, 'rejected')} >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    
    <div>
    <Title level={2}>Loan Applications</Title>
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
