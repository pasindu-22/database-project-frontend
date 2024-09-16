import { useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Import your Axios instance

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the interceptor
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle session expiration
          message.error('Session expired. Please log in again.');
          // Redirect to customer login using React Router's navigate
          navigate('/customer-login');
        }
        return Promise.reject(error);
      }
    );

    // Eject the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]); // Depend on `navigate` hook
};

export default useAxiosInterceptor;
