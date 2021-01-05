import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface Props {}

const ValidatePage: FC<Props> = () => <SC.Container>VALIDATE</SC.Container>;

export default compose<FC>(memo)(ValidatePage);
