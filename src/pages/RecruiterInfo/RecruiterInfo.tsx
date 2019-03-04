import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

const RecruiterInfoInfo = ({ dispatch }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <>
      <NavBar mode="dark">完善个人信息</NavBar>
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
        onClick={() => dispatch({ type: 'user/handleImprove', payload: { position, desc, company } })}
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