import { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';
import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

const BreadcrumbHeader: FC = () => (
  <SC.BreadcrumbHeader>
    <SC.Breadcrumbs
      separator={<SC.BreadcrumbSeparator>{'>'}</SC.BreadcrumbSeparator>}
    >
      <Breadcrumb>
        <SC.Link href='/' target='_self'>
          Felles datakatalog publisering
        </SC.Link>
      </Breadcrumb>
      <Breadcrumb active>Valideringsverktøy</Breadcrumb>
    </SC.Breadcrumbs>
  </SC.BreadcrumbHeader>
);

export default compose<FC>(memo)(BreadcrumbHeader);
