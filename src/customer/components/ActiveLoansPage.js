import React, { useEffect, useState } from 'react';
import { Badge, Space, Table, Button, Modal, Form, Select, Input, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import useAxiosInterceptor from '../../utils/useAxiosInterceptor';

const { Option } = Select;

const ActiveLoansPage = () => {
  const { details } = useAuth();
  const [loanData, setLoanData] = useState([]);
  const [installmentData, setInstallmentData] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  useAxiosInterceptor(); // Use this custom hook to handle session expiration

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3001/api/loans/customer/${details.Customer_ID}`);
        setLoanData(response.data);
      } catch (error) {
        console.error("Error occurred while loading");
      }
    };

    if (details && details.Customer_ID) {
      fetchLoanData();
    } else {
      console.error("Error occurred");
    }
  }, [details]);

  const fetchLoanInstallments = async (loanID) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/api/loanInstallments/loan/${loanID}`);
      setInstallmentData((prevData) => ({
        ...prevData,
        [loanID]: response.data,
      }));
    } catch (error) {
      console.error("Error occurred while loading installments");
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/api/accounts/customer/${details.Customer_ID}`);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error occurred while loading accounts");
    }
  };

  const handlePay = (installment) => {
    setSelectedInstallment(installment);
    fetchAccounts();
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      const response = await axiosInstance.post(`http://localhost:3001/api/payments`, {
        accountID: values.accountID,
        installmentID: selectedInstallment.Installment_ID,
        amount: selectedInstallment.Value,
      });
      if (response.status === 200) {
        message.success("Payment successful");
        setIsModalVisible(false);
        // Refresh the installment data
        fetchLoanInstallments(selectedInstallment.Loan_ID);
      }
    } catch (error) {
      message.error("Payment failed");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Installment ID',
        dataIndex: 'Installment_ID',
        key: 'installment_id',
      },
      {
        title: 'Transaction ID',
        dataIndex: 'Transaction_ID',
        key: 'transaction_id',
      },
      {
        title: 'Due Date',
        dataIndex: 'Due_Date',
        key: 'due_date',
        // render: (text) => <Badge status="error" text={text} />,
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
            {!record.Transaction_ID && <Button type="primary" onClick={() => handlePay(record)}>Pay</Button>}
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={installmentData[record.Loan_ID] || []}
        pagination={false}
        rowKey="Installment_ID"
      />
    );
  };

  const columns = [
    {
      title: 'Loan ID',
      dataIndex: 'Loan_ID',
      key: 'loan_id',
    },
    {
      title: 'Branch ID',
      dataIndex: 'Branch_ID',
      key: 'branch_id',
    },
    {
      title: 'Customer ID',
      dataIndex: 'Customer_ID',
      key: 'Customer_ID',
    },
    {
      title: 'Loan Period',
      dataIndex: 'LoanPeriod',
      key: 'loan_period',
    },
    {
      title: 'Interest Rate',
      dataIndex: 'InterestRate',
      key: 'interest_rate',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'date',
    },
    {
      title: 'Loan Value',
      dataIndex: 'LoanValue',
      key: 'value',
    },
  ];

  return (
    <>
      <div style={{ margin: '20px', justifyContent: 'center', borderRadius: '15px' }}>
        <h1>Active Loans</h1>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
            onExpand: (expanded, record) => {
              if (expanded) {
                fetchLoanInstallments(record.Loan_ID);
                setExpandedRowKeys([record.Loan_ID]);
              } else {
                setExpandedRowKeys([]);
              }
            },
            expandedRowKeys,
          }}
          style={{ margin: '20px' }}
          dataSource={loanData}
          rowKey="Loan_ID"
        />
      </div>
      <Modal
        title="Pay Installment"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <Form.Item
            name="accountID"
            label="From Account"
            rules={[{ required: true, message: 'Please select an account' }]}
          >
            <Select placeholder="Select an account">
              {accounts.map((account) => (
                <Option key={account.Account_ID} value={account.Account_ID}>
                  {account.Account_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
          >
            <Input value={selectedInstallment?.Value} disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pay
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ActiveLoansPage;