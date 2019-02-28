import axios from 'axios';

const instance = axios.create({
  timeout: 20000
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjMyMSIsImV4cCI6MTU1NjI2MDc3MC4xOCwiaWF0IjoxNTUxMDc2NzcwfQ.aynBz1m6QSB2ZdAbaghnXEAa2L_osjkqiLuMs65zSro';
    }
    return config;
  },
  error => {
    console.log(error)
  }
)

export default instance