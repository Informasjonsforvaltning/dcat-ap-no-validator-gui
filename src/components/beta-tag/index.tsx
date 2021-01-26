import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

const BetaTag: FC = () => <SC.BetaTag>BETA</SC.BetaTag>;

export default compose<FC>(memo)(BetaTag);
