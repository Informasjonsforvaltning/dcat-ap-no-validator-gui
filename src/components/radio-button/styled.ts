import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import { LabelPosition } from './enums';

interface Props {
  labelPosition?: LabelPosition;
}

const RadioButton = styled.div`
  display: flex;
  background: ${theme.colour(Colour.NEUTRAL, 'N0', 1)};
  cursor: pointer;

  & > input {
    margin-top: 3px;
    cursor: pointer;
  }

  & > input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N70')};
  }

  & > input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    content: '';
    display: inline-block;
    visibility: visible;
    border: 6px solid ${theme.colour(Colour.NEUTRAL, 'N60')};
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

export default { RadioButton, Label };
