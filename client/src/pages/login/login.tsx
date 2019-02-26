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
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  // 登录提交
  const submitLogin = () => {
    dispatch({ type: 'user/handleLogin', payload: { user, pwd } })
    setPwd('')
    console.log(redirectTo)
  }
  
  return (
    <div>
      {redirectTo ? <Redirect to={redirectTo} /> : null}
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
    </div>
  )
};

const mapStateToProps = (state) => {
  console.log(state.user)
  return {
    redirectTo: state.user.redirectTo
  }
}

export default connect(mapStateToProps)(Login);
