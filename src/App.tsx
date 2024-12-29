import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Page403 from './containers/shared/Page403';
import Page404 from './containers/shared/Page404';
import Page500 from './containers/shared/Page500';
import AppLayout from './containers/AppLayout';
import { createBrowserHistory } from 'history';
const App: React.FC = () => {
  return (
    // <AppRibb
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/403" component={Page403} />
        <Route exact path="/404" component={Page404} />
        <Route exact path="/500" component={Page500} />
        <Route path="/" component={AppLayout} />
      </Switch>
    </Router>
  );
};
export default App;
