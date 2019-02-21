import React, { useReducer } from 'react';
import { History } from 'history';
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';

const initState = {
  user: '',
  pwd: ''
};

interface stateInterface {
  user: String;
  pwd: String;
}

const reducer  = (state: stateInterface, action: any) => {
  switch(action.type) {
    case 'changeVal':
      console.log(state)
      return {
        ...state,
        [action.key]: action.val
      }
    default:
      return state;
  }
}
interface Props {
  history: History;
}

const Login = ({ history }: Props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <WingBlank>
        <List>
          <InputItem
            onChange={(v) => dispatch({ type: 'changeVal', key: 'user', val: v })}
          >
          用户
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(v) => dispatch({ type: 'changeVal', key: 'pwd', val: v })}
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
};

export default Login;
