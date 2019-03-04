import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

const ApplicantInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <>
      <NavBar mode="dark">完善个人信息</NavBar>
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
        onClick={() => dispatch({ type: 'user/handleImprove', payload: { position, desc} })}
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