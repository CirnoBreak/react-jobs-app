import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register/register';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/register" component={Register}></Route>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
;
