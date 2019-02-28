import React from 'react';
import {
  Route,
  routerRedux,
  Switch
} from 'dva/router';
import { History } from 'history';
import Register from './pages/register';
import Login from './pages/login';
import Auth from './pages/main';

const { ConnectedRouter } = routerRedux;

const RouterConfig = ({ history }: { history: History }) => {
  return (
    <ConnectedRouter history={history}>
      <>
        <Auth />
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
      </>
    </ConnectedRouter>
  )
}

export default RouterConfig;