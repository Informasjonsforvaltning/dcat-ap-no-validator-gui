import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface Props {}

const ValidatePage: FC<Props> = () => (
  <SC.ValidatePage>
    <SC.Title>Valideringsverktøy</SC.Title>
  </SC.ValidatePage>
);

export default compose<FC>(memo)(ValidatePage);
