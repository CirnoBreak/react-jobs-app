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
    .catch((err) => console.log('errrr', err));
}

// 完善用户信息
export function improve (payload): Promise<any> {
  return axios.patch('/users/improveinfo', payload)
    .catch((err) => console.log(err));
}

// 获取招聘者/职位列表
export function userList (payload): Promise<any> {
  return axios.get(`/users/userList/${payload.type}`)
    .catch((err) => console.log(err));
}