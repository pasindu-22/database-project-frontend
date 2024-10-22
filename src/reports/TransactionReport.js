import React, { useState, useMemo } from 'react';
import { Radio, DatePicker, Button, Table, message, Row, Col, Statistic, Modal } from 'antd';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PieChartOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';

const { RangePicker } = DatePicker;

const ReportPage = () => {
  const { details } = useAuth();
  const [reportType, setReportType] = useState('outgoing');
  const [dateRange, setDateRange] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionTotals, setTransactionTotals] = useState([]);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleSubmit = async () => {
    if (!dateRange.length) {
      message.error('Please select a date range');
      return;
    }

    const [startDate, endDate] = dateRange;
    const formattedStartDate = startDate.format('YYYY-MM-DD');
    const formattedEndDate = endDate.format('YYYY-MM-DD');

    console.log('Fetching report data for', reportType, 'transactions from', formattedStartDate, 'to', formattedEndDate);

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `http://localhost:3001/api/transactions/${reportType}Report/${details.Manager_ID}`,
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }
      );
      setReportData(response.data);
    } catch (error) {
      message.error('Error fetching report data');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    if (!reportData.length) {
      message.warning('No data available to generate the PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Transaction Report', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['From Account', 'To Account', 'Date', 'Value', 'Type']],
      body: reportData.map((row) => [
        row.FromAccount,
        row.ToAccount,
        moment(row.Date).format('YYYY-MM-DD'),
        row.Value,
        row.Type,
      ]),
    });
    doc.save(`transaction_report_${reportType}.pdf`);
  };

  const fetchTransactionTotals = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/api/transactions/transaction-totals/${details.Manager_ID}`);
      setTransactionTotals([
        { type: 'Incoming', value: response.data.totalIncoming },
        { type: 'Outgoing', value: response.data.totalOutgoing },
      ]);
    } catch (error) {
      message.error('Error fetching transaction totals');
    }
  };

  const handleShowChart = () => {
    fetchTransactionTotals();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Calculating the total value and average value
  const totalValue = useMemo(
    () => reportData.reduce((total, record) => total + (Number(record.Value) || 0), 0),
    [reportData]
  );

  const averageValue = useMemo(
    () => (reportData.length ? totalValue / reportData.length : 0),
    [reportData, totalValue]
  );

  const columns = [
    {
      title: 'From Account',
      dataIndex: 'FromAccount',
      key: 'fromAccount',
    },
    {
      title: 'To Account',
      dataIndex: 'ToAccount',
      key: 'toAccount',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'date',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      key: 'value',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'type',
    },
  ];

  const pieChartConfig = {
    appendPadding: 10,
    data: transactionTotals,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Total Transactions',
      },
    },
  };

  console.log(transactionTotals);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transaction Reports</h1>
      <Radio.Group value={reportType} onChange={handleReportTypeChange}>
        <Radio value="outgoing">Outgoing</Radio>
        <Radio value="incoming">Incoming</Radio>
      </Radio.Group>
      <RangePicker
        style={{ marginLeft: '20px' }}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginLeft: '20px' }}
        disabled={loading}
      >
        Submit
      </Button>
      <Button
        type="primary"
        onClick={generatePDF}
        style={{ marginLeft: '20px' }}
        disabled={!reportData.length}
      >
        Download PDF
      </Button>
      <Button
        type="primary"
        icon={<PieChartOutlined />}
        onClick={handleShowChart}
        style={{ marginLeft: '20px' }}
      >
        Display Chart
      </Button>

      {/* Calculated Summary Section */}
      <div style={{ marginTop: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Total Transactions" value={reportData.length} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Value"
              value={Number.isFinite(totalValue) ? totalValue.toFixed(2) : '0.00'}
              prefix="Rs"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Average Transaction Value"
              value={Number.isFinite(averageValue) ? averageValue.toFixed(2) : '0.00'}
              prefix="Rs"
            />
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={reportData}
        rowKey="id"
        loading={loading}
        style={{ marginTop: '20px' }}
        pagination={{ pageSize: 7 }}
      />

      {/* Modal with pie chart */}
      <Modal
        title="Transaction Totals"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Pie {...pieChartConfig} />
      </Modal>
    </div>
  );
};

export default ReportPage;