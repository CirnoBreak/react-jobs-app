import * as userService from '../services/userService';
// import * as chatService from '../services/chatService';

const initState = {
  msgList: ''
};

export default {
  namespace: 'chat',
  state: {
    ...initState
  },
  effects: {
    * getMsgList (payload, { call }) {
      const { data } = yield call(userService.info);
      console.log(data);
    }
  }
};