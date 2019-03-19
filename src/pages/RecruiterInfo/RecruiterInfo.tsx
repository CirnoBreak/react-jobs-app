import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button,
  Toast
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Avatar from '../../components/Avatar/Avatar';

const RecruiterInfoInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [desc, setDesc] = useState('');
  const [money, setMoney] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = () => {
    if (!!avatar && !!position && !!desc && !!company && !!money) {
      return dispatch({
        type: 'user/handleImprove',
        payload: { avatar, position, desc, company, money }
      });
    } else if (!avatar) {
      Toast.fail('请选择头像', 1);
    } else {
      Toast.fail('请检查信息填写', 1);
    }
  };
  return (
    <>
      <NavBar mode="dark">完善信息</NavBar>
      <Avatar
        changeAvatar={(avatarText) => setAvatar(avatarText)}
      />
      <InputItem
        onChange={(v) => setPosition(v)}
      >
        招聘职位
      </InputItem>
      <InputItem
        onChange={(v) => setCompany(v)}
      >
        公司名称
      </InputItem>
      <InputItem
        onChange={(v) => setMoney(v)}
      >
        职位薪资
      </InputItem>
      <TextareaItem
        onChange={(v) => setDesc(v)}
        rows={3}
        autoHeight
        title="职位要求"
        count={120}
      >
      </TextareaItem>
      <Button
        type="primary"
        onClick={handleSubmit}
      >
        保存
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectTo: state.user.redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(RecruiterInfoInfo));