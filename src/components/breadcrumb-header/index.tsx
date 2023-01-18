import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';

import env from '../../env';

import SC from './styled';

const { FDK_BASE_URI } = env;

const BreadcrumbHeader: FC = () => (
  <SC.BreadcrumbHeader>
    <SC.Breadcrumbs
      separator={<SC.BreadcrumbSeparator>{'>'}</SC.BreadcrumbSeparator>}
    >
      <Breadcrumb>
        <SC.Link href={`${FDK_BASE_URI}/publishing`} target='_self'>
          Felles datakatalog publisering
        </SC.Link>
      </Breadcrumb>
      <Breadcrumb active>Valideringsverktøy</Breadcrumb>
    </SC.Breadcrumbs>
  </SC.BreadcrumbHeader>
);

export default compose<FC>(memo)(BreadcrumbHeader);
