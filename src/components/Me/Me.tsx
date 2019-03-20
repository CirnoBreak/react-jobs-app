import React from 'react';
// import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { connect } from 'dva';
// const Item = List.Item;
// const Brief = Item.Brief;

const Me = () => {
  // const { username, avatar, desc, position, money, company} = user;
  return (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Me);