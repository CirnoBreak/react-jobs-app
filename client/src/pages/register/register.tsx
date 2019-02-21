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
  count: number;
  dispatch: any;
}

const reducer = (state: stateInterface, action: any) => {
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

const Register = (props: any) => {
  const RadioItem = Radio.RadioItem;
  const [state, dispatch1] = useReducer(reducer, initState);

  return (
    <List>
      <InputItem
        onChange={(val) => dispatch1({ type: 'changeVal', key: 'user', val })}
        >
        {props.count}用户名
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(val) => dispatch1({ type: 'changeVal', key: 'pwd', val})}
        >
        密码
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(val) => dispatch1({ type: 'changeVal', key: 'repeatPwd', val})}>
        确认密码
      </InputItem>
      <WhiteSpace />
      <RadioItem
        checked={state.type === 'genius'}
        onChange={() => dispatch1({ type: 'changeVal', key: 'type', val: 'genius' })}
        >
        牛人
      </RadioItem><WhiteSpace />
      <WhiteSpace />
      <RadioItem
        checked={state.type === 'boss'}
        onChange={() => dispatch1({ type: 'changeVal', key: 'type', val: 'boss' })}
        >
        BOSS
      </RadioItem>
      <WhiteSpace />
      <Button type="primary" onClick={() => console.log(props)}></Button>
      <Button type="primary" onClick={() => props.dispatch({ type: 'count/add' })}></Button>
    </List>
  )
}

const mapStateToProps = ({ count }: {count: any}) => {
  return {
    count: count.count.test.gg.ok
  }
}

export default connect(mapStateToProps)(Register);