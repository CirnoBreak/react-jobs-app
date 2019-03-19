import React, { useEffect } from 'react';
import { NavBar } from 'antd-mobile';
import { Route } from 'dva/router';
import { connect } from 'dva';
import Footer from '../../components/Footer/Footer';
import Applicant from '../../components/Applicant/Applicant';
import Recruiter from '../../components/Recruiter/Recruiter';
import Msg from '../../components/Msg/Msg';
import Me from '../../components/Me/Me';

const UserCenter = ({ location: { pathname }, history, type }) => {
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  const navList = [
    {
      path: '/recruiter',
      text: 'home',
      title: '求职者',
      icon: 'search',
      component: Recruiter,
      hide: type === 'applicant'
    },
    {
      path: '/applicant',
      text: 'jobs',
      title: '职位',
      icon: 'find',
      component: Applicant,
      hide: type === 'recruiter'
    },
    {
      path: '/msg',
      text: 'msg',
      title: '消息',
      icon: 'msg',
      component: Msg
    },
    {
      path: '/me',
      text: 'me',
      title: '我的',
      icon: 'me',
      component: Me
    }
  ];
  const page = navList.find((item) => item.path === pathname);
  return page ? (
    <>
      <NavBar mode="dark">{page.title}</NavBar>
      {
        <Route key={page.path} path={page.path} component={page.component}></Route>
      }
      <Footer list={navList} path={page.path} history={history}></Footer>
    </>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    type: state.user.type
  };
};

export default connect(mapStateToProps)(UserCenter);