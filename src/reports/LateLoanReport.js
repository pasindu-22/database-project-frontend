import React, { useEffect, useState } from 'react';
import { Badge, Space, Table, Button, message, Modal } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import useAxiosInterceptor from '../utils/useAxiosInterceptor';

const LateLoanReport = () => {
  const { details } = useAuth();
  const [loanData, setLoanData] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // useAxiosInterceptor(); // Use this custom hook to handle session expiration
  
  useEffect(() => {
    const fetchLateLoans = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3001/api/loanInstallments/late/${details.Manager_ID}`);
        setLoanData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred while loading late loans");
      }
    };

    if (details && details.Manager_ID) {
      fetchLateLoans();
    } else {
      console.error("Manager ID not found");
    }
  }, [details]);

  const fetchCustomerDetails = async (loanID) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/api/customers/by-loan/${loanID}`);
      setCustomerDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error occurred while loading customer details");
    }
  };

  const handleRemind = (installmentID) => {
    // Implement the remind functionality here
    message.success(`Reminder sent for installment ID: ${installmentID}`);
  };

  const columns = [
    {
      title: 'Loan ID',
      dataIndex: 'Loan_ID',
      key: 'loan_id',
      render: (text, record) => (
        <Button type="link" onClick={() => fetchCustomerDetails(record.Loan_ID)}>
          {text}
        </Button>
      ),
    }, 
    {
      title: 'Due Date',
      dataIndex: 'DueDate',
      key: 'due_date',
      render: (text) => {
        const localDate = new Date(text).toLocaleString();
        return <Badge status="error" text={localDate} />;
      },
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      key: 'value',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleRemind(record.Installment_ID)}>Remind</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: '20px', justifyContent: 'center', borderRadius: '15px' }}>
      <h1>Late Loans</h1>
      <Table
        columns={columns}
        style={{ margin: '20px' }}
        dataSource={loanData}
        rowKey="Installment_ID"
      />
      <Modal
        title="Customer Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="notify" type="primary" onClick={() => handleRemind(customerDetails?.Installment_ID)}>
            Notify
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {customerDetails && (
          <div>
            <p><strong>Customer ID:</strong> {customerDetails.Customer_ID}</p>
            <p><strong>Customer Name:</strong> {customerDetails.Name}</p>
            <p><strong>Loan ID:</strong> {customerDetails.loan.Loan_ID}</p>
            <p><strong>Branch ID:</strong> {customerDetails.loan.Branch_ID}</p>
            <p><strong>Loan Period:</strong> {customerDetails.loan.LoanPeriod}</p>
            <p><strong>Interest Rate:</strong> {customerDetails.loan.InterestRate}</p>
            <p><strong>Date:</strong> {customerDetails.loan.Date}</p>
            <p><strong>Loan Value:</strong> {customerDetails.loan.LoanValue}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LateLoanReport;