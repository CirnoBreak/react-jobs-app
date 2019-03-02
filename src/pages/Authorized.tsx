import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

/**
 * 权限路由组件
 */
const Authorized = ({ location, dispatch }) => {
  const [isMounted, setIsMounted] = useState(false);
  // 白名单路由
  const whiteList = ['/login', '/register'];
  const pathname = location.pathname;
  /**
   * 在没有登录或者登录失败的时候跳转的路由，
   * 此时只能跳转 /login 或者 /register，
   * 但两者如果跟当前输入的路径完全匹配，就分别跳转对应路径(因此需要白名单),
   * 否则默认重定向到 /login
   */
  const redirectPath = whiteList.indexOf(pathname) > -1 ? pathname : '/login';
  useEffect(() => {
    if (!isMounted) {
      dispatch({ type: 'user/handleAuth', payload: { redirectPath, pathname } });
      setIsMounted(true);
    }
  }, [isMounted]);

  return null;
};

export default withRouter(connect(null)(Authorized));