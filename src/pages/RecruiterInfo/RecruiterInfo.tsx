import React, { useState } from 'react';
import {
  TextareaItem,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

const RecruiterInfoInfo = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [desc, setDesc] = useState('');
  const test = () => {
    console.log(title, desc, company);
  };
  return (
    <>
      {test()}
      <NavBar mode="dark">完善个人信息</NavBar>
      <InputItem
        onChange={(v) => setTitle(v)}
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
      <Button type="primary">保存</Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectTo: state.user.redirectTo,
  };
};

export default withRouter(connect(mapStateToProps)(RecruiterInfoInfo));