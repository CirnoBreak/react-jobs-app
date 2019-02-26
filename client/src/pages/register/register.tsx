import React, { useState } from 'react';
import { History } from 'history';
import {
  InputItem,
  List,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile';
import { connect } from 'dva';

interface Props {
  history: History;
  dispatch: Function;
}

/**
 * 注册组件
 * @param param0 
 */
const Register = ({ history, dispatch }: Props) => {
  const RadioItem = Radio.RadioItem;
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [type, setType] = useState('genius');

  return (
    <List>
      <InputItem
        onChange={(val) => setUser(val)}
        >
        用户名
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        value={pwd}
        onChange={(val) => setPwd(val)}
        >
        密码
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        value={repeatPwd}
        onChange={(val) => setRepeatPwd(val)}>
        确认密码
      </InputItem>
      <WhiteSpace />
      <RadioItem
        checked={type === 'genius'}
        onChange={() => setType('genius')}
        >
        牛人
      </RadioItem><WhiteSpace />
      <WhiteSpace />
      <RadioItem
        checked={type === 'boss'}
        onChange={() => setType('boss')}
        >
        BOSS
      </RadioItem>
      <WhiteSpace />
      <Button
        type="primary"
        onClick={() => {
          dispatch({ type: 'user/handleRegister', payload: { user, pwd, repeatPwd, type }})
          setPwd('')
          setRepeatPwd('')
        }}>
        注册
      </Button>
    </List>
  )
}


export default connect(null)(Register);