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

import Root from '../../../components/root';

import { Path } from '../../../types/enums';

import env from '../../../env';

const { ROUTE_BASE_NAME } = env;

const routes = {
  validate: lazy(() => import('./validate'))
};

interface Props {
  history?: History;
}

const Router: FC<Props> = ({ history }) => {
  const AppRouter: FC = ({ children }) =>
    history ? (
      <BaseRouter history={history}>{children}</BaseRouter>
    ) : (
      <BrowserRouter basename={ROUTE_BASE_NAME}>{children}</BrowserRouter>
    );

  return (
    <AppRouter>
      <Header />
      <BreadcrumbHeader />
      <Root>
        <Suspense fallback={null}>
          <Switch>
            <Route path={Path.VALIDATE} component={routes.validate} />
            <Redirect to={Path.VALIDATE} />
          </Switch>
        </Suspense>
      </Root>
      <Footer />
    </AppRouter>
  );
};

export default compose<FC>(memo)(Router);
