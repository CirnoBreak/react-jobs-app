import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

const app = dva({
  history: createHistory()
});

app.use(require('dva-immer').default());

app.model(require('./models/user').default);

app.router(require('./router').default);

app.start('#root');