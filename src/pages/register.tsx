import React, { useState } from 'react';
import {
  InputItem,
  List,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { Redirect } from 'dva/router';

interface Props {
  dispatch: Function;
}

/**
 * 注册组件
 */
const Register = ({ dispatch }: Props) => {
  const RadioItem = Radio.RadioItem;
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [type, setType] = useState('applicant');
  const token = localStorage.getItem('token');
  // 在登陆成功后(localStorage7有token)再次回来注册页面的,跳转到 / 再判断一次
  const redirectAuth = () => {
    return token && <Redirect to="/" />;
  };
  return (
    <>
      {redirectAuth()}
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
          checked={type === 'applicant'}
          onChange={() => setType('applicant')}
        >
          我要找工作
        </RadioItem><WhiteSpace />
        <WhiteSpace />
        <RadioItem
          checked={type === 'recruiter'}
          onChange={() => setType('recruiter')}
        >
          我要招人
        </RadioItem>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => {
            dispatch({ type: 'user/handleRegister', payload: { user, pwd, repeatPwd, type }});
            setPwd('');
            setRepeatPwd('');
          }}>
          注册
        </Button>
      </List>
    </>
  );
};


export default connect(null)(Register);