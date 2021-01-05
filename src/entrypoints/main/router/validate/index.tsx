import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

const pages = {
  validate: lazy(() => import('./pages/validate-page'))
};

const ValidateRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={url} component={pages.validate} />
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(ValidateRouter);
