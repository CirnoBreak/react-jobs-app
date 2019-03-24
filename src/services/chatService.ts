import axios from '../lib/axios';

export function getMsgList (): Promise<any> {
  return axios.get('/chat/msgList');
}

export function markRead (payload): Promise<any> {
  return axios.post('/chat/read', payload);
}