import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Calendar } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Events = () => {
    const [events, setEvents] = useState([]); // State for calendar events

    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
              const response = await axios.get('/api/calendar-events');
              setEvents(response.data);
            } catch (error) {
              console.error('Error fetching events:', error);
            }
          };
          fetchEvents();

    },[]);

    const dateCellRender = (value) => {
        const currentDayEvents = events.filter(
          (event) => moment(event.date).isSame(value, 'day')
        );
        return (
          <ul>
            {currentDayEvents.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        );
      };

  return (
    <>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Events" style={{ borderRadius: '10px' }}>
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </Col>
      </Row>
    </>
  ); 
}

export default Events