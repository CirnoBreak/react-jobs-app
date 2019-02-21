import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import test from './models/test'

const app = dva({
  onError: () => {},
  history: createHistory()
});

app.use(require('dva-immer').default());

app.model(test);

app.router(require('./router').default);

app.start('#root');