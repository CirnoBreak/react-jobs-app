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

const ApplicantInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [desc, setDesc] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = () => {
    if (!!avatar && !!desc && !!avatar) {
      return dispatch({
        type: 'user/handleImprove',
        payload: { avatar, position, desc }
      });
    } else {
      Toast.fail('信息不能为空', 1);
    }
  };
  return (
    <>
      <NavBar mode="dark">完善个人信息</NavBar>
      <Avatar
        changeAvatar={(avatarText) => setAvatar(avatarText)}
      />
      <InputItem onChange={(v) => setPosition(v)}>
        求职职位
      </InputItem>
      <TextareaItem
        onChange={(v) => setDesc(v)}
        rows={3}
        autoHeight
        title="个人简介"
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

export default withRouter(connect(mapStateToProps)(ApplicantInfo));