import React from 'react';
import {
  Route,
  routerRedux,
  Switch
} from 'dva/router';
import { History } from 'history';
import Register from './pages/register/register';
import Login from './pages/login/login';

const { ConnectedRouter } = routerRedux;

const RouterConfig = ({ history }: { history: History }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig;