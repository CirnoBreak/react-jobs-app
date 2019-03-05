import axios from 'axios';
import { Toast } from 'antd-mobile';

const instance = axios.create({
  timeout: 20000
});

instance.interceptors.request.use(
  (config) => {
    Toast.loading('Loading...');
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    Toast.hide();
    return config;
  }
);

export default instance;