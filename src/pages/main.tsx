import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { info } from '../services/user';

/**
 * 权限路由组件
 *
 */
const AuthRoute = ({ location, history, dispatch }) => {
  const [isMounted, setIsMounted] = useState(false);
  const publicList = ['/login', '/register'];
  const pathname = location.pathname;
  const redirectPath = publicList.indexOf(pathname) > -1 ? pathname : '/login';
  const routerOperation = () => {
    return info()
      .then(res => {
        if (res.data.status === 200) {
          dispatch({ type: 'user/SET_USER_INFO', payload: res.data.data });
        } else {
          history.push(redirectPath);
        }
      })
      .catch(() => {
        history.push(redirectPath);
      });
  };

  useEffect(() => {
    if (!isMounted) {
      routerOperation();
      setIsMounted(true);
    }
  }, [isMounted]);

  return null;
};

export default withRouter(connect(null)(AuthRoute));