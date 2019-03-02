import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

const ApplicantInfo = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const test = () => {
    console.log(title, desc);
  };
  return (
    <>
      {test()}
      <NavBar mode="dark">完善个人信息</NavBar>
      <InputItem onChange={(v) => setTitle(v)}>
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
      <Button type="primary">保存</Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectTo: state.user.redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(ApplicantInfo));