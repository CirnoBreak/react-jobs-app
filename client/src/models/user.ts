import * as userService from '../services/user';
import { getRedirectPath } from '../lib/utils';

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
    },
    SET_USER_INFO (state, { payload }) {
      Object.entries(payload).map(([key, val]) => {
        state[key] = val;
      })
    },
    AUTH_SUCCESS (state, { payload }) {
      state.msg = '';
      state.redirectTo = getRedirectPath(payload);
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
        if (data && data.data.status === 200) {
          localStorage.setItem('token', data.data.token)
          yield put({ type: 'AUTH_SUCCESS', payload: { type: data.data.data.type } })
        }
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