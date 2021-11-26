import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'src/pages/login/Login';
import Register from 'src/pages/register/Register';
import PrivateRoute from 'src/components/private-route/private-route';
import Layout from 'src/containers/Layout';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/app" component={Layout} />
      {/*Implement roles on server to use authorithies <PrivateRoute path="/app" component={Layout} hasAnyAuthorities={[AUTHORITIES.USER]} />*/}
      <Redirect to="/app" />
    </Switch>
  );
};

export default Routes;
