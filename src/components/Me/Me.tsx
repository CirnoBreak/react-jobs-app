import React, { Fragment } from 'react';
import { WhiteSpace, Result, List, Button, Modal } from 'antd-mobile';
import { connect } from 'dva';
const Item = List.Item;
const Brief = Item.Brief;

const Me = ({ user, dispatch }) => {
  const { username, avatar, desc, position, money, company } = user;
  const logOut = () => {
    Modal.alert('退出登录', '确定要退出登录?', [{
      text: '取消',
      onPress: () => {}
    }, {
      text: '确定',
      onPress: () => {
        dispatch({ type: 'user/handleLogout', payload: { type: 'token' }});
      }
    }]);
  };
  return (
    <Fragment>
      <Result
        img={
          <img
            src={avatar && require(`../../img/${avatar}.png`)}
            alt="avatar"
          />
        }
        title={username}
        message={!!company && company}
      />
      <List
        renderHeader={'信息'}
        className="my-list"
      >
        <Item multipleLine>
          <Brief>职位: {position}</Brief>
          <Brief>简介: {desc}</Brief>
          <Brief>薪资: {money}</Brief>
        </Item>
      </List>
      <WhiteSpace />
      <Button
        onClick={() => logOut()}
        type="warning"
      >
        退出登录
      </Button>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Me);