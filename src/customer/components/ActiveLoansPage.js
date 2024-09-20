import React, {useEffect, useState} from 'react';
import { Badge, Space, Table } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const ActiveLoansPage = () => {
  const { details } = useAuth();
  const [loanData, setLoanData] = useState([]);
  const [installmentData,setInstallmentData ] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect( () => {
    const fetchLoanData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3001/api/loans/customer/${details.Customer_ID}`);
        setLoanData(response.data)
      } catch(error) {
        console.error("Error occured while loading");
      } finally {

      }
  };

    if (details && details.Customer_ID) {
      fetchLoanData();
    } else {
      console.error("Error occcured");
    }

  },[details,setLoanData]);

  // Expanding row render.

  const fetchLoanInstallements = async (loanID) => {
      try {
        const response =  await axiosInstance.get(`http://localhost:3001/api/loanInstallments/loan/${loanID}`);
        setInstallmentData((prevData) => ({
          ...prevData,
          [loanID]: response.data,
        }));
        console.log(installmentData);
      } catch(error) {
        console.error("Error Occured");
      }
    };

  useEffect( () => {
    if (expandedRowKeys.length >0) {
      const loanID = expandedRowKeys[expandedRowKeys.length - 1];
      fetchLoanInstallements(loanID);
    }
  }, [expandedRowKeys]);

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
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: 'Value',
        dataIndex: 'Value',
        key: 'value',
      },
      {
        title: 'Action',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <button>Pay</button>
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
    // return <Table columns={columns} dataSource={installmentData} pagination={false} />;
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
      title: 'Intereset Rate',
      dataIndex: 'InterestRate',
      key: 'creator',
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
    {
      title: 'Action',
      key: 'operation',
      render: () => <button>Pay</button>,
    },
  ];

  return (
    <>
    <div style={{ margin: '20px', justifyContent:'center',borderRadius:'15px'}}>
      <h1>Active Loans</h1>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.Loan_ID] : []);
          },
          expandedRowKeys,
        }}
        style={{ margin: '20px' }}
        dataSource={loanData}
        rowKey="Loan_ID"
      />
    </div>
    </>
  );
};
export default ActiveLoansPage;