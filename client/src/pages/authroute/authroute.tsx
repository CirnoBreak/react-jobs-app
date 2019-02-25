import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { info } from '../../services/user'

const AuthRoute = ({ location, history }) => {
  const [isMounted, setIsMounted] = useState(false);
  const publicList = ['/login', '/register'];
  const pathname = location.pathname;
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!isMounted) {
      if (token) {

      } else {
        if (publicList.indexOf(pathname) > -1) {
          history.push(pathname)
        } else {
          history.push('/login')
        }
      }
      setIsMounted(true);
    }
  });

  return null;
}

export default withRouter(connect(null)(AuthRoute))