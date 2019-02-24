import React, { useReducer, useState } from 'react';
import { History } from 'history';
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'dva'

const CHANGE_VALUE = 'changeVal';
interface Props {
  history: History;
  dispatch: Function;
}

const Login = ({ history, dispatch }: Props) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  
  return (
    <div>
      <WingBlank>
        <List>
          <InputItem
            onChange={(val) => setUser(val)}
          >
          用户
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(val) => setPwd(val)}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <Button
          onClick={() => dispatch({ type: 'user/handleLogin', payload: { user, pwd } })}
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

export default connect(null)(Login);
