import React, { useReducer } from 'react';
import { History } from 'history';
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'dva'

const initState = {
  user: '',
  pwd: ''
};

const CHANGE_VALUE = 'changeVal';

interface stateInterface {
  user: String;
  pwd: String;
}

const reducer  = (state: stateInterface, action) => {
  switch(action.type) {
    case 'changeVal':
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
  dispatch: Function;
}

const Login = ({ history, dispatch }: Props) => {
  const [state, locDispatch] = useReducer(reducer, initState);
  const { user, pwd } = state;
  return (
    <div>
      <WingBlank>
        <List>
          <InputItem
            onChange={(v) => locDispatch({ type: CHANGE_VALUE, key: 'user', val: v })}
          >
          用户
          </InputItem>
          <WhiteSpace />
          <InputItem
            onChange={(v) => locDispatch({ type: CHANGE_VALUE, key: 'pwd', val: v })}
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
