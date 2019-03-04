import axios from 'axios';

const instance = axios.create({
  timeout: 20000
});

instance.interceptors.request.use(
  config => {
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

export default instance;