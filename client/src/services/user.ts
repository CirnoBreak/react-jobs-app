import axios from '../lib/axios';

export function register (payload): Promise<any> {
  return axios.post('/users/reg', payload)
    .catch(err => console.log(err))
}

export function login (payload): Promise<any> {
  return axios.post('/users/login', payload)
    .catch(err => console.log());
}

export function info (): Promise<any> {
  return axios.get('/users/info')
    .catch(err => console.log(err))
}