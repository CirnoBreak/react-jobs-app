import React from 'react';
import { observer } from 'mobx-react-lite';
import LogStore from '../../stores/logStore';
import { History } from 'history';

import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { withRouter } from 'react-router';

interface Props {
  history: History;
}

const Login = observer(({ history }: Props) => {

  return (
    <div>
      <WingBlank>
        <List>
          <InputItem
            onChange={(v) => (LogStore.user = v)}
          >
          用户
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(v) => (LogStore.pwd = v)}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <Button
          onClick={() => {}}
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
});

export default withRouter(Login);
