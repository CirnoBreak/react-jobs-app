import React, { useEffect } from 'react';
import { NavBar } from 'antd-mobile';
import { Route } from 'dva/router';
import Footer from '../../components/Footer/Footer';

const UserCenter = ({ location: { pathname }, history}) => {
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  const navList = [
    {
      path: '/recruiter',
      text: 'home',
      title: '求职者',
      icon: 'search'
    },
    {
      path: '/applicant',
      text: 'jobs',
      title: '职位',
      icon: 'find'
    },
    {
      path: '/msg',
      text: 'msg',
      title: '消息',
      icon: 'msg'
    },
    {
      path: '/me',
      text: 'me',
      title: '我的',
      icon: 'me'
    }
  ];
  const page = navList.find((item) => item.path === pathname);
  return page ? (
    <>
      <NavBar mode="dark">{page.title}</NavBar>
      {
        <Route key={page.path} path={page.path}></Route>
      }
      <Footer list={navList} path={page.path} history={history}></Footer>
    </>
  ) : null;
};

export default UserCenter;