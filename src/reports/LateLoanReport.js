import React, { useEffect, useState, useMemo } from 'react';
import { Badge, Space, Table, Button, message, Modal, Row, Col, Statistic } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LateLoanReport = () => {
  const { details } = useAuth();
  const [loanData, setLoanData] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchLateLoans = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/loanInstallments/late/${details.Manager_ID}`
        );
        setLoanData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error occurred while loading late loans');
      }
    };

    if (details && details.Manager_ID) {
      fetchLateLoans();
    } else {
      console.error('Manager ID not found');
    }
  }, [details]);

  const fetchCustomerDetails = async (loanID) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3001/api/customers/by-loan/${loanID}`
      );
      setCustomerDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error occurred while loading customer details');
    }
  };

  const handleRemind = (installmentID) => {
    // Implement the remind functionality here
    message.success(`Reminder sent for installment ID: ${installmentID}`);
  };

  const generatePDF = () => {
    if (!loanData.length) {
      message.warning('No data available to generate the PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Late Loan Report', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Installment ID', 'Loan ID', 'Due Date', 'Value']],
      body: loanData.map((row) => [
        row.Installment_ID,
        row.Loan_ID,
        new Date(row.DueDate).toLocaleString(),
        row.Value,
      ]),
    });
    doc.save(`late_loan_report.pdf`);
  };

  // Calculating the total value, average value, and number of late loans
  const totalLoanValue = useMemo(
    () => loanData.reduce((total, record) => total + (Number(record.Value) || 0), 0),
    [loanData]
  );

  const averageLoanValue = useMemo(
    () => (loanData.length ? totalLoanValue / loanData.length : 0),
    [loanData, totalLoanValue]
  );

  const columns = [
    {
      title: 'Installment ID',
      dataIndex: 'Installment_ID',
      key: 'installment_id',
      render: (text, record) => (
        <Button type="link" onClick={() => fetchCustomerDetails(record.Loan_ID)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Loan ID',
      dataIndex: 'Loan_ID',
      key: 'loan_id',
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
  ];

  return (
    <div style={{ margin: '20px', justifyContent: 'center', borderRadius: '15px' }}>
      <h1>Late Loans</h1>
      
      {/* Summary Section */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Statistic title="Total Late Loans" value={loanData.length} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Loan Value"
            value={Number.isFinite(totalLoanValue) ? totalLoanValue.toFixed(2) : '0.00'}
            prefix="$"
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Average Loan Value"
            value={Number.isFinite(averageLoanValue) ? averageLoanValue.toFixed(2) : '0.00'}
            prefix="$"
          />
        </Col>
      </Row>

      {/* Table for Loan Data */}
      <Table
        columns={columns}
        style={{ margin: '20px' }}
        dataSource={loanData}
        rowKey="Installment_ID"
      />

      <Button type="primary" onClick={generatePDF} disabled={!loanData.length}>
        Download PDF
      </Button>

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
            <p>
              <strong>Customer ID:</strong> {customerDetails.Customer_ID}
            </p>
            <p>
              <strong>Customer Name:</strong> {customerDetails.Name}
            </p>
            <p>
              <strong>Loan ID:</strong> {customerDetails.loan.Loan_ID}
            </p>
            <p>
              <strong>Branch ID:</strong> {customerDetails.loan.Branch_ID}
            </p>
            <p>
              <strong>Loan Period:</strong> {customerDetails.loan.LoanPeriod}
            </p>
            <p>
              <strong>Interest Rate:</strong> {customerDetails.loan.InterestRate}
            </p>
            <p>
              <strong>Date:</strong> {customerDetails.loan.Date}
            </p>
            <p>
              <strong>Loan Value:</strong> {customerDetails.loan.LoanValue}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LateLoanReport;
