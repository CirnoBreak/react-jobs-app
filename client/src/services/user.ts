import axios from 'axios';

export function register (payload) {
  return axios.post('/users/reg', payload)
    .catch(err => console.log(err))
}

export function login (payload) {
  return axios.post('/users/login', payload)
    .catch(err => console.log(err));
}