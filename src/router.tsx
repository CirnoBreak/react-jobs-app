import React, { Fragment } from 'react';
import {
  Route,
  routerRedux,
  Switch
} from 'dva/router';
import { History } from 'history';
import Register from './pages/Register/register';
import Login from './pages/Login/Login';
import Authorized from './pages/Authorized';
import ApplicantInfo from './pages/ApplicantInfo/ApplicantInfo';
import RecruiterInfo from './pages/RecruiterInfo/RecruiterInfo';
import UserCenter from './pages/UserCenter/UserCenter';

const { ConnectedRouter } = routerRedux;

const RouterConfig = ({ history }: { history: History }) => {
  return (
    <ConnectedRouter history={history}>
      <Fragment>
        <Authorized />
        <Switch>
          <Route path="/recruiterinfo" component={RecruiterInfo}></Route>
          <Route path="/applicantinfo" component={ApplicantInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={UserCenter}></Route>
        </Switch>
      </Fragment>
    </ConnectedRouter>
  );
};

export default RouterConfig;