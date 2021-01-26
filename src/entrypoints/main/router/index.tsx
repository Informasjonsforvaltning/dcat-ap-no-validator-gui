import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  BrowserRouter,
  Router as BaseRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import type { History } from 'history';

import Footer from '@fellesdatakatalog/internal-footer';
import Header from '../../../components/header';
import BreadcrumbHeader from '../../../components/breadcrumb-header';
import BetaTag from '../../../components/beta-tag';

import Root from '../../../components/root';

import { Path } from '../../../types/enums';

const routes = {
  validator: lazy(() => import('./validator'))
};

interface Props {
  history?: History;
}

const Router: FC<Props> = ({ history }) => {
  const AppRouter: FC = ({ children }) =>
    history ? (
      <BaseRouter history={history}>{children}</BaseRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );

  return (
    <AppRouter>
      <Header />
      <BreadcrumbHeader />
      <BetaTag />
      <Root>
        <Suspense fallback={null}>
          <Switch>
            <Route path={Path.VALIDATOR} component={routes.validator} />
            <Redirect to={Path.VALIDATOR} />
          </Switch>
        </Suspense>
      </Root>
      <Footer />
    </AppRouter>
  );
};

export default compose<FC>(memo)(Router);
