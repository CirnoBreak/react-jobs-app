import * as React from 'react';
import { withRouter } from 'react-router-dom';
import useRegStore from './store/regStore';
import { observer } from 'mobx-react-lite';
import { InputItem, List, WhiteSpace, Radio } from 'antd-mobile';

const Register = observer(() => {
  const RadioItem = Radio.RadioItem;
  const regStore = useRegStore();

  return (
    <List>
      <InputItem
        onChange={(v) => (regStore.user = v)}
        >
        用户名
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(v) => (regStore.pwd = v)}
        >
        密码
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(v) => (regStore.repeatPwd = v)}>
        确认密码
      </InputItem>
      <WhiteSpace />
      <RadioItem
        checked={regStore.type === 'genius'}
        onChange={() => (regStore.type = 'genius')}
        >
        牛人
      </RadioItem><WhiteSpace />
      <WhiteSpace />
      <RadioItem
        checked={regStore.type === 'boss'}
        onChange={() => (regStore.type = 'boss')}
        >
        BOSS
      </RadioItem>
    </List>
  )
})


export default withRouter(Register);