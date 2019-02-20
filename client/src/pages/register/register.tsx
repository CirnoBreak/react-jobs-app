import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RegStore from '../../stores/regStore';
import { observer } from 'mobx-react-lite';
import {
  InputItem,
  List,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile';

const Register = observer((props) => {
  const RadioItem = Radio.RadioItem;

  return (
    <List>
      <InputItem
        onChange={(v) => (RegStore.user = v)}
        >
        用户名
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(v) => (RegStore.pwd = v)}
        >
        密码
      </InputItem>
      <WhiteSpace />
      <InputItem
        type="password"
        onChange={(v) => (RegStore.repeatPwd = v)}>
        确认密码
      </InputItem>
      <WhiteSpace />
      <RadioItem
        checked={RegStore.type === 'genius'}
        onChange={() => (RegStore.type = 'genius')}
        >
        牛人
      </RadioItem><WhiteSpace />
      <WhiteSpace />
      <RadioItem
        checked={RegStore.type === 'boss'}
        onChange={() => (RegStore.type = 'boss')}
        >
        BOSS
      </RadioItem>
      <WhiteSpace />
      <Button type="primary" onClick={() => console.log(props)}></Button>
    </List>
  )
})


export default withRouter(Register);