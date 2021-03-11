import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import { LabelPosition } from './enums';

interface Props {
  labelPosition?: LabelPosition;
}

const Checkbox = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${theme.colour(Colour.NEUTRAL, 'N0', 1)};
  cursor: pointer;

  & > input {
    margin-top: 3px;
    cursor: pointer;
  }
`;

const Label = styled.label<Props>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  ${({ labelPosition }) => {
    switch (labelPosition) {
      case LabelPosition.RIGHT:
        return css`
          margin-left: ${theme.spacing('S16')};
        `;
      default:
        return css`
          margin-right: ${theme.spacing('S16')};
        `;
    }
  }};
`;

export default { Checkbox, Label };
