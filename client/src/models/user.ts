import * as userService from '../services/user';

const getRedirectPath = ({ type, avatar }) => {
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
}

export default {
  namespace: 'user',
  state: {
    redirectTo: '',
    isLogin: false,
    msg: '',
    user: '',
    type: ''
  },
  reducers: {
    REGISTER_SUCCESS (state, { payload }) {
      state.msg = '';

    },
    SET_ERR_MSG (state, { payload: { msg } }) {
      state.msg = msg;
    }
  },
  effects: {
    *handleLogin ({ payload: { user, pwd } }, { call, put }) {
      let msg: string = '';
      if (!user || !pwd) {
        msg = '用户名或者密码不能为空';
      }

      yield put({ type: 'SET_ERR_MSG', payload: { msg } })

      if (user && pwd) {
        const data = yield call(userService.login, { user, pwd });
        console.log(data);
      }
    },
    *handleRegister ({ payload: { user, pwd, repeatPwd, type } }, { call, put }) {
      let msg: string = '';

      if (!user || !pwd) {
        msg = '用户名和密码不能为空';
      }

      if (pwd && (pwd !== repeatPwd)) {
        msg = '两次密码输入不一致';
      }

      yield put({ type: 'SET_ERR_MSG', payload: { msg } })

      if ((pwd === repeatPwd) && user && pwd && repeatPwd && type) {
        const data = yield call(userService.register, { user, pwd, repeatPwd, type})
      }
    }
  }
}