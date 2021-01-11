import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: ${theme.spacing('S8')} ${theme.spacing('S24')};
  appearance: none;
  border: none;
  outline: none;
  font-weight: ${theme.fontWeight('FW500')};
  background: ${theme.colour(Colour.NEUTRAL, 'N60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    background: ${theme.colour(Colour.NEUTRAL, 'N50')};
  }
`;

export default { Button };
