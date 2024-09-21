import React, { useState } from 'react';
import { Radio, DatePicker, Button, Table, message } from 'antd';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ReportPage = () => {
  const { details } = useAuth();
  const [reportType, setReportType] = useState('outgoing');
  const [dateRange, setDateRange] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transaction Reports</h1>
      <Radio.Group onChange={handleReportTypeChange} value={reportType}>
        <Radio value="outgoing">Outgoing</Radio>
        <Radio value="incoming">Incoming</Radio>
      </Radio.Group>
      <RangePicker onChange={handleDateChange} style={{ marginLeft: '20px' }} />
      <Button type="primary" onClick={handleSubmit} style={{ marginLeft: '20px' }}>
        Submit
      </Button>
      <Table
        columns={columns}
        dataSource={reportData}
        rowKey="id"
        loading={loading}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default ReportPage;