import axios from 'axios';
import { message } from 'antd';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://database-backend-g8-d3f914ee6287.herokuapp.com/api/',
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Handle session expiration
//       message.error('Session expired. Please log in again.');
//       // Redirect to login page
//       window.location.href = '/customer-login'; // Use window.location.href to redirect
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
