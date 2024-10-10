import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        showSorterTooltip: {
            target: 'full-header',
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: {
            target: 'full-header',
        },
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Role ID',
        dataIndex: 'role_id',
        showSorterTooltip: {
            target: 'full-header',
        },
    },
    {
        title: 'Member Since',
        dataIndex: 'createdAt',
        showSorterTooltip: {
            target: 'full-header',
        },
    },
    {
        title: 'Last Updated',
        dataIndex: 'updatedAt',
        showSorterTooltip: {
            target: 'full-header',
        },
    },
];

const ManagerList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend using Axios
        axios.get('http://localhost:3001/api/managers')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data');
            });
    }, []);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        console.log('Data:', data); 
    };

    return (
        <Table size='large'
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey="id" 
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
        />
    );
};

export default ManagerList;
