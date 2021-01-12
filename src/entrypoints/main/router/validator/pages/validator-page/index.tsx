import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface Props {}

const ValidatorPage: FC<Props> = () => (
  <SC.ValidatorPage>
    <SC.Title>Valideringsverktøy</SC.Title>
  </SC.ValidatorPage>
);

export default compose<FC>(memo)(ValidatorPage);
