import React,{useState,useEffect} from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [greetings, setGreetings] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime.toLocaleTimeString());

      const hours = currentTime.getHours();
      if (hours < 12) {
        setGreetings('  Good Morning!');
      } else if (hours < 18) {
        setGreetings('  Good Afternoon!');
      } else {
        setGreetings('  Good Evening!');
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  

  const handleNewTransaction = () => {
    navigate('/customer/transaction/new');
  };

  const handleNewCustomer = () => {
    navigate('/customer/loan/new');
  };


  return (
    <>
    <div style={{display:'flex', justifyContent:'left',padding: '20px'}}>
        <h1>Hey!</h1>
        <h1>{greetings}</h1>
    </div>
    <div style={{display:'flex', justifyContent:'left',padding: '20px', flexDirection:'column'}}>
    <div style={{ margin: '20px' }}>
      <Button type="primary" onClick={handleNewTransaction} style={{
        padding: '20px 40px',        // Increased padding for a larger button
        fontSize: '24px',            // Larger font size
        border: 'none',              // No border
        borderRadius: '10px',        // Rounded corners
        cursor: 'pointer',           // Pointer cursor on hover
        width: '200px',              // Specific width
        height: '80px'
      }}>
        New Transaction
      </Button>
      
    </div>
    <div style={{ margin: '20px' }}>
      <Button type="primary" onClick={handleNewCustomer} style={{
        padding: '20px 40px',        // Increased padding for a larger button
        fontSize: '24px',            // Larger font size
        border: 'none',              // No border
        borderRadius: '10px',        // Rounded corners
        cursor: 'pointer',           // Pointer cursor on hover
        width: '200px',              // Specific width
        height: '80px'
      }}>
        New Online Loan
        </Button>
    </div>
    </div>
    </>
  );
};

export default HomePage;
