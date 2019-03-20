import React, { Fragment, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import CardList from '../CardList/CardList';

const Applicant = ({ dispatch, userList }) => {
  const getUserList = useCallback(() => {
    if (!userList.length) {
      dispatch({ type: 'user/handleUserList', payload: { type: 'recruiter' }});
    }
  }, [dispatch, userList]);
  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <Fragment>
      <CardList
        list={userList}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList
  };
};

export default connect(mapStateToProps)(Applicant);