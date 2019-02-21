import React, { useReducer } from 'react';
import { History } from 'history';
import {
  InputItem,
  List,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile';
import { connect } from 'dva';

const CHANGE_VALUE = 'changeVal';

const initState = {
  user: '',
  pwd: '',
  repeatPwd: '',
  type: 'genius'
};

interface stateInterface {
  user: String;
  pwd: String;
  repeatPwd: String;
  type: String;
}

interface Props {
  history: History;
  dispatch: Function;
}

const reducer = (state: stateInterface, action) => {
  switch(action.type) {
    case 'changeVal':
      return {
        ...state,
        [action.key]: action.val
      }
    case 'validateForm':
      return state;
    default:
      return state;
  }
}

const Register = ({ history, dispatch }: Props) => {
  const RadioItem = Radio.RadioItem;
  const [state, locDispatch] = useReducer(reducer, initState);
  const { user, pwd, repeatPwd, type } = state;
  return (
    <List>
      <InputItem
        onChange={(val) => locDispatch({ type: CHANGE_VALUE, key: 'user', val })}
        >
        用户名
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(val) => locDispatch({ type: CHANGE_VALUE, key: 'pwd', val})}
        >
        密码
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(val) => locDispatch({ type: CHANGE_VALUE, key: 'repeatPwd', val})}>
        确认密码
      </InputItem>
      <WhiteSpace />
      <RadioItem
        checked={type === 'genius'}
        onChange={() => locDispatch({ type: CHANGE_VALUE, key: 'type', val: 'genius' })}
        >
        牛人
      </RadioItem><WhiteSpace />
      <WhiteSpace />
      <RadioItem
        checked={type === 'boss'}
        onChange={() => locDispatch({ type: CHANGE_VALUE, key: 'type', val: 'boss' })}
        >
        BOSS
      </RadioItem>
      <WhiteSpace />
      <Button
        type="primary"
        onClick={() => {
          dispatch({ type: 'user/handleRegister', payload: { user, pwd, repeatPwd, type }})
        }}>
        注册
      </Button>
    </List>
  )
}


export default connect(null)(Register);