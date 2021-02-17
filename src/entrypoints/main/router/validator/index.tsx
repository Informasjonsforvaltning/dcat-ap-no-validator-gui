import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

const pages = {
  validator: lazy(() => import('./pages/validator-page'))
};

const ValidatorRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route path={url} component={pages.validator} />
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(ValidatorRouter);
