import React, { memo, FC } from 'react';
import { compose } from 'redux';

interface ExternalProps {
  id: string;
}

interface Props extends ExternalProps {}

const Translation: FC<Props> = ({ id }) => <>{id}</>;

export default compose<FC<ExternalProps>>(memo)(Translation);
