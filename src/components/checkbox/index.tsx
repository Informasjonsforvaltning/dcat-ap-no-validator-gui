/* eslint-disable jsx-a11y/label-has-for */
import React, {
  memo,
  FC,
  useState,
  PropsWithChildren,
  ComponentPropsWithoutRef,
  // MouseEventHandler,
  useEffect
} from 'react';
import { compose } from 'redux';
import cuid from 'cuid';
import { LabelPosition } from './enums';

import SC from './styled';

interface Props extends ComponentPropsWithoutRef<'input'> {
  labelPosition?: LabelPosition;
}

const Checkbox: FC<Props> = ({
  checked,
  labelPosition,
  children,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const id = cuid();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <SC.Checkbox>
      {(!labelPosition || labelPosition === LabelPosition.LEFT) && (
        <SC.Label labelPosition={labelPosition} htmlFor={id}>
          {children}
        </SC.Label>
      )}
      <input id={id} type='checkbox' checked={isChecked} {...props} />
      {labelPosition === LabelPosition.RIGHT && (
        <SC.Label labelPosition={labelPosition} htmlFor={id}>
          {children}
        </SC.Label>
      )}
    </SC.Checkbox>
  );
};

export { LabelPosition };

export default compose<FC<PropsWithChildren<Props>>>(memo)(Checkbox);
