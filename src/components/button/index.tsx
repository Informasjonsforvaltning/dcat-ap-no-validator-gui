import React, {
  memo,
  FC,
  PropsWithChildren,
  ComponentPropsWithoutRef
} from 'react';
import { compose } from 'redux';

import SC from './styled';

interface ExternalProps extends ComponentPropsWithoutRef<'button'> {}

interface Props extends ExternalProps {}

const Button: FC<PropsWithChildren<Props>> = ({ children, ...props }) => (
  <SC.Button type='button' {...props}>
    {children}
  </SC.Button>
);

export default compose<FC<ExternalProps>>(memo)(Button);
