import React, { useState } from 'react';
import { History } from 'history';
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { Redirect } from 'dva/router';

interface Props {
  history: History;
  dispatch: Function;
  redirectTo: string;
}

/**
 * 登录组件
 * @param Object history history路由相关的
 * @param Function dispatch dva的dispatch方法
 */
const Login = ({ history, dispatch, redirectTo }: Props) => {
  // 账号密码的 state
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  // 登录提交
  const submitLogin = () => {
    dispatch({ type: 'user/handleLogin', payload: { user, pwd } });
    // 每次点击提交一次密码
    setPwd('');
  };
  // 登陆后存放在localStorage的token
  const token = localStorage.getItem('token');
  /**
   * 不同状态访问 /login 判断路由跳转方式
   * 1. 登录成功之后，store会有redirectTo(定位到对应角色对应的主界面的路径)，
   *    当再次访问/login会直接跳转到当前用户对应的主界面路径。
   * 2. 刷新浏览器并且登录了(此时并不能及时获得redirect但实际上也是登录了),
   *    此时读取localStorage的token判断是否存在，如果有，就跳转到 / 再做一次路由判断
   * 3. 两者都不符合，直接呆在 /login
   */
  const redirectAuth = () => {
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    } else if (token) {
      return <Redirect to="/" />;
    }
    return null;
  };
  return (
    <>
      {redirectAuth()}
      <WingBlank>
        <List>
          <InputItem
            onChange={(val) => setUser(val)}
          >
          用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            value={pwd}
            type="password"
            onChange={(val) => setPwd(val)}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <Button
          onClick={() =>
            submitLogin()
          }
          type="primary"
        >
          登录
        </Button>
        <WhiteSpace />
        <Button
          onClick={() => history.push('/register')}
          type="primary"
        >
          注册
        </Button>
      </WingBlank>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    redirectTo: state.user.redirectTo
  };
};

export default connect(mapStateToProps)(Login);
