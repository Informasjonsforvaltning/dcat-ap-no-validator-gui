/* eslint-disable jsx-a11y/label-has-for */
import React, {
  memo,
  FC,
  useState,
  PropsWithChildren,
  useEffect,
  ComponentPropsWithoutRef
} from 'react';
import { compose } from 'redux';
import cuid from 'cuid';
import { LabelPosition } from './enums';

import SC from './styled';

interface Props extends ComponentPropsWithoutRef<'input'> {
  labelPosition?: LabelPosition;
}

const RadioButton: FC<Props> = ({
  checked,
  onChange = () => {},
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
    <SC.RadioButton>
      {(!labelPosition || labelPosition === LabelPosition.LEFT) && (
        <SC.Label labelPosition={labelPosition} htmlFor={id}>
          {children}
        </SC.Label>
      )}
      <input
        id={id}
        type='radio'
        checked={isChecked}
        onChange={onChange}
        {...props}
      />
      {labelPosition === LabelPosition.RIGHT && (
        <SC.Label labelPosition={labelPosition} htmlFor={id}>
          {children}
        </SC.Label>
      )}
    </SC.RadioButton>
  );
};

export { LabelPosition };

export default compose<FC<PropsWithChildren<Props>>>(memo)(RadioButton);
