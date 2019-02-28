import axios from '../lib/axios';

// 注册
export function register (payload): Promise<any> {
  return axios.post('/users/reg', payload)
    .catch(err => console.log(err));
}

// 登录
export function login (payload): Promise<any> {
  return axios.post('/users/login', payload)
    .catch(err => console.log(err));
}

// 获取用户信息
export function info (): Promise<any> {
  return axios.get('/users/info')
    .catch((err) => { console.log('errrr', err) });
}