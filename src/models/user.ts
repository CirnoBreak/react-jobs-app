import * as userService from '../services/user';
import getRedirectPath from '../lib/utils';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

const initState = {
  redirectTo: '',
  isLogin: false,
  username: '',
  type: '',
  userList: []
};

export default {
  namespace: 'user',
  state: {
    ...initState
  },
  reducers: {
    // 设置用户信息
    SET_USER_INFO (state, { payload }) {
      Object.entries(payload).map(([key, val]) => {
        state[key] = val;
        return null;
      });
    },
    // 登录/注册成功后跳转
    AUTH_SUCCESS (state, { payload }) {
      state.redirectTo = getRedirectPath(payload);
    },
    SET_USER_LIST (state, { payload }) {
      state.userList = payload.list;
    },
    LOG_OUT () {
      return {
        ...initState
      };
    }
  },
  effects: {
    // 登录逻辑
    * handleLogin ({ payload: { username, pwd } }, { call, put }) {
      let msg: string = '';
      if (!username || !pwd) {
        msg = '用户名或者密码不能为空';
        Toast.fail(msg, 1);
      }

      if (!!username && !!pwd) {
        const data = yield call(userService.login, { username, pwd });
        if (data && data.data.status === 200) {
          Toast.success('登陆成功', 1);
          localStorage.setItem('token', data.data.token);
          yield put({ type: 'AUTH_SUCCESS', payload: { type: data.data.data.type, avatar: data.data.data.avatar || null } });
        }
      }
    },
    // 注册逻辑
    * handleRegister ({ payload: { username, pwd, repeatPwd, type } }, { call, put }) {
      let msg: string = '';
      if (!username || !pwd) {
        msg = '用户名和密码不能为空';
        Toast.fail(msg, 1);
      }

      if (pwd && (pwd !== repeatPwd)) {
        msg = '两次密码输入不一致';
        Toast.fail(msg, 1);
      }

      if ((pwd === repeatPwd) && username && pwd && repeatPwd && type) {
        const { data: { status }} = yield call(userService.register, { username, pwd, type });
        if (status === 200) {
          yield put(routerRedux.push('/login'));
          Toast.success('注册成功', 1);
        }
        Toast.fail('注册失败', 1);
      }
    },
    // 路由校验逻辑
    * handleAuth ({ payload: { redirectPath, pathname } }, { call, put }) {
      const data = yield call(userService.info);
      const { data: { status, data: userData } } = data || { data: { status: 401, data: {} }};
      const token = localStorage.getItem('token');
      const { type, avatar } = userData || { type: '', avatar: '' };
      if (status === 200) {
        // 存储用户信息到state
        yield put({ type: 'SET_USER_INFO', payload: userData });
        const mainPath = getRedirectPath({ type, avatar });
        // 如果登录成功(有token)并且其实浏览器路由为 / 则跳转到相应角色的主界面
        if (token && (pathname === '/')) {
          yield put(routerRedux.push(mainPath));
        }
        // 如果登录成功(有token)并且此时浏览器路由为 /login 或者 /register 则跳转到相应角色的主界面
        if (token && (pathname === '/login' || pathname === '/register')) {
          yield put(routerRedux.push(mainPath));
        }
        // yield put(routerRedux.push(mainPath));
      } else {
        token && localStorage.removeItem('token');
        // 没有登录或者登录失败的时候，跳转到 /login 或者 /register(不匹配register的都跳到/login)
        yield put(routerRedux.push(redirectPath));
      }
    },
    // 完善信息逻辑
    * handleImprove ({ payload }, { call, put }) {
      const { data: { username, type, avatar } } = yield call(userService.improve, payload);
      if (username) {
        yield put(routerRedux.push(getRedirectPath({ type, avatar })));
      }
    },
    // 获取应聘者/职位列表逻辑
    * handleUserList ({ payload }, { call, put }) {
      const { data: { list, status} } = yield call(userService.userList, payload);
      if (status === 200) {
        yield put({ type: 'SET_USER_LIST', payload: { list }});
      }
    },
    * handleLogout ({ payload }, { put }) {
      localStorage.removeItem(payload.type);
      yield put({ type: 'LOG_OUT' });
      yield put(routerRedux.push('/login'));
      Toast.success('成功注销', 1);
    }
  }
};