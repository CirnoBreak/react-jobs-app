import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
;
