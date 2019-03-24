import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

const app = dva({
  history: createHistory()
});

/*eslint-disable*/
app.use(require('dva-immer').default());

app.model(require('./models/chatModel').default);
app.model(require('./models/userModel').default);

app.router(require('./router').default);

app.start('#root');
