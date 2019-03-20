import React, { Fragment, useState } from 'react';
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

/**
 * 应聘者个人信息
 */
const ApplicantInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [desc, setDesc] = useState('');
  const [money, setMoney] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = () => {
    if (!!avatar && !!desc && !!avatar && !!money) {
      return dispatch({
        type: 'user/handleImprove',
        payload: { avatar, position, desc, money }
      });
    } else if (!avatar) {
      Toast.fail('请选择头像', 1);
    } else {
      Toast.fail('请检查信息填写', 1);
    }
  };
  return (
    <Fragment>
      <NavBar mode="dark">完善信息</NavBar>
      <Avatar
        changeAvatar={(avatarText) => setAvatar(avatarText)}
      />
      <InputItem onChange={(v) => setPosition(v)}>
        求职职位
      </InputItem>
      <InputItem
        onChange={(v) => setMoney(v)}
      >
        期望薪资
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectTo: state.user.redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(ApplicantInfo));