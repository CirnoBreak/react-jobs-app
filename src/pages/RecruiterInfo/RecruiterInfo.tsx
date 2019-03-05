import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Avatar from '../../components/Avatar/Avatar';

const RecruiterInfoInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [desc, setDesc] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = () => {
    return dispatch({
      type: 'user/handleImprove',
      payload: { avatar, position, desc, company }
    });
  };
  return (
    <>
      <NavBar mode="dark">完善个人信息</NavBar>
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

export default withRouter(connect(mapStateToProps)(RecruiterInfoInfo));