import * as chatService from '../services/chatService';

const initState = {
  msgList: [],
  users: {},
  unread: 0
};

export default {
  namespace: 'chat',
  state: {
    ...initState
  },
  reducers: {
    SET_CHAT_DATA (state, { payload: { msgList, userId, users } }) {
      state.msgList = msgList;
      state.users = users;
      state.unread = msgList.filter((msg) => !msg.read && (msg.to === userId)).length;
    },
    SET_RECEIVE_MSG (state, { payload: { msg, userId } }) {
      const unreadNum = msg.to === userId ? 1 : 0;
      state.msgList = [...state.msgList, msg];
      state.unread += unreadNum;
    }
  },
  effects: {
    * getMsgList (payload, { call, select, put }) {
      const { data: { msgList, status, users } } = yield call(chatService.getMsgList);
      if (status === 200) {
        const _id = yield select(state => state.user._id);
        yield put({ type: 'SET_CHAT_DATA', payload: { msgList, userId: _id, users }});
      }
    }
  }
};