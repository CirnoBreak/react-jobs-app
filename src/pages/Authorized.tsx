import { useEffect, useCallback } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

/**
 * 权限路由组件
 */
const Authorized = ({ location, dispatch }) => {
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
  // 鉴权
  const handleAuth = useCallback(() => {
    dispatch({ type: 'user/handleAuth', payload: { redirectPath, pathname } });
  }, [dispatch, pathname, redirectPath]);
  // 每次加载新页面都进行鉴权
  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return null;
};

export default withRouter(connect(null)(Authorized));